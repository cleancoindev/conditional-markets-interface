import React from "react";
import Page from "components/Page";
import Spinner from "components/Spinner";
import { findIndex, find } from "lodash";
import {
  renderComponent,
  compose,
  lifecycle,
  branch,
  withState,
  withStateHandlers,
  withHandlers
} from "recompose";

import {
  loadMarginalPrices,
  loadMarkets,
  loadProbabilitiesForPredictions,
  buyOutcomes,
  sellOutcomes,
  loadCollateral,
} from "api/markets";
import {
  loadBalances,
  loadPositions,
  generatePositionList,
  sumPricePerShare,
  listOutcomePairsMatchingOutcomeId,
  calcOutcomeTokenCounts,
  generateBuyDetails,
  getCollateralBalance,
} from "api/balances";
import Decimal from "decimal.js";
import { loadConfig } from "../../api/web3";

export const LOADING_STATES = {
  UNKNOWN: "UNKNOWN",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE"
};

const marketLoadingFailure = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100vh"
    }}
  >
    <h2>Failed to load 😞</h2>
    <h3>Please check the following:</h3>
    <ul>
      <li>Connect to correct network (Rinkeby or Mainnet)</li>
      <li>Install/Unlock Metamask</li>
    </ul>
  </div>
);
const marketLoading = () => (
  <div style={{ height: "100%", width: "100%" }}>
    <Spinner centered inverted width={100} height={100} />
  </div>
);

const loadingHandler = branch(
  ({ loading }) => loading !== "SUCCESS",
  branch(
    ({ loading }) => loading === "FAILURE",
    renderComponent(marketLoadingFailure),
    renderComponent(marketLoading)
  )
);

const enhancer = compose(
  withState("loading", "setLoading", LOADING_STATES.UNKNOWN),
  withState("markets", "setMarkets", {}),
  withState("sellAmounts", "setSellAmounts", {}),
  withState("invest", "setInvest"),
  withState("prices", "setPrices", {}),
  withState("balances", "setBalances", {}),
  withState("collateral", "setCollateral", { symbol: "E", name: "ETH", decimals: 18 }),
  withState("positionIds", "setPositionIds", {}),
  withState("positions", "setPositions", {}),
  withState("stagedPositions", "setStagedPositions", null),
  withState("outcomesToBuy", "setOutcomesToBuy", []),
  withState("outcomeTokenBuyAmounts", "setOutcomeTokenBuyAmounts", []),
  withState("selectionPrice", "setSelectionPrice", 0),
  withState("predictionProbabilities", "setPredictionProbabilities", []),
  withState("validPosition", "setValidPosition", false),
  withState("isBuying", "setBuyingStatus", false),
  withState("buyError", "setBuyError", ""),
  lifecycle({
    async componentDidMount() {
      const {
        setLoading,
        setMarkets,
        setPrices,
        setPositionIds,
        setPositions,
        setCollateral,
        setBalances
      } = this.props;
      setLoading(LOADING_STATES.LOADING);

      try {
        const prices = await loadMarginalPrices();
        await setPrices(prices);
        const markets = await loadMarkets(prices);
        await setMarkets(markets);
        const positionIds = await loadPositions();
        await setPositionIds(positionIds);
        const balances = await loadBalances(positionIds);
        await setBalances(balances);
        const positions = await generatePositionList(balances);
        await setPositions(positions);
        const collateral = await loadCollateral();
        await setCollateral(collateral);

        setLoading(LOADING_STATES.SUCCESS);
      } catch (err) {
        setLoading(LOADING_STATES.FAILURE);
        console.error(err.message);
        console.error(err.stack);
      }
    }
  }),
  withStateHandlers(
    {
      assumptions: [],
      unlockedPredictions: false,
      selectedOutcomes: {},
      targetPairs: []
    },
    {
      unlockPredictions: () => () => ({
        unlockedPredictions: true
      }),
      removeAssumption: ({ assumptions }) => conditionIdToRemove => {
        const conditionIndex = assumptions.indexOf(conditionIdToRemove);

        if (conditionIndex > -1) {
          assumptions.splice(conditionIndex, 1);
        }

        return { assumptions: [...assumptions] };
      },
      addAssumption: ({ assumptions }) => conditionId => {
        if (!assumptions.includes(conditionId)) {
          return {
            assumptions: [...assumptions, conditionId]
          };
        }

        return { assumptions };
      },
      selectOutcomes: ({ selectedOutcomes }) => (
        conditionId,
        outcomeIndex
      ) => ({
        selectedOutcomes: {
          ...selectedOutcomes,
          [conditionId]: outcomeIndex
        }
      })
    }
  ),
  withHandlers({
    handleUpdateMarkets: ({
      prices,
      assumptions,
      markets,
      selectedOutcomes,
      setMarkets,
      outcomeTokenBuyAmounts
    }) => async () => {
      const assumedOutcomeIndexes = [];

      Object.keys(selectedOutcomes).forEach(targetConditionId => {
        if (assumptions.includes(targetConditionId)) {
          const marketIndex = findIndex(
            markets,
            ({ conditionId }) => conditionId == targetConditionId
          );
          let lmsrOutcomeIndex = 0;
          for (let i = 0; i < marketIndex; i++)
            lmsrOutcomeIndex += markets[marketIndex].outcomes.length;

          const selectedOutcome = parseInt(
            selectedOutcomes[targetConditionId],
            10
          );
          assumedOutcomeIndexes.push(lmsrOutcomeIndex + selectedOutcome);
        }
      });
      const marketsWithAssumptions = await loadMarkets(
        prices,
        assumedOutcomeIndexes
      );
      setMarkets(marketsWithAssumptions);
    },
    handleUpdateAffectedOutcomes: ({
      markets,
      setOutcomesToBuy,
      setSelectionPrice,
      selectedOutcomes,
      setValidPosition,
      assumptions
    }) => async () => {
      const outcomeIndexes = [];
      const assumedIndexes = [];

      // transform selectedOutcomes into outcomeIndex array, filtering all assumptions
      let totalOutcomeIndex = 0;
      markets.forEach(market => {
        if (
          selectedOutcomes[market.conditionId] != null
        ) {
          const selectedOutcome = parseInt(selectedOutcomes[market.conditionId], 10);

          if (assumptions.includes(market.conditionId)) {
            assumedIndexes.push(totalOutcomeIndex + selectedOutcome)
          } else {
            outcomeIndexes.push(totalOutcomeIndex + selectedOutcome);
          }
        }

        totalOutcomeIndex += market.outcomes.length;
      });

      // sets which outcome combinations will be bought
      const outcomePairs = await listOutcomePairsMatchingOutcomeId(
        outcomeIndexes
      );
      const assumedPairs = assumedIndexes.length > 0 ? await listOutcomePairsMatchingOutcomeId(assumedIndexes, true) : []
      await setOutcomesToBuy(outcomePairs);

      // sets if the selected position is valid (ie not all positions and not no positions)
      await setValidPosition(
        outcomePairs.length > 0 && outcomePairs.length < totalOutcomeIndex + 1
      );

      generateBuyDetails(outcomePairs, assumedPairs)

      // update the price for the selected outcomes the user would buy
      const selectionPrice = await sumPricePerShare(outcomePairs);
      await setSelectionPrice(selectionPrice);
    },
    handleUpdateOutcomeTokenCounts: ({
      selectedOutcomes,
      assumptions,
      markets,
      setPredictionProbabilities,
      setOutcomeTokenBuyAmounts,
      setStagedPositions,
    }) => async amount => {
      const amountValid = !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;

      if (!amountValid) return;

      const outcomeIndexes = [];
      const assumedIndexes = [];

      // transform selectedOutcomes into outcomeIndex array, filtering all assumptions
      let totalOutcomeIndex = 0;
      markets.forEach(market => {
        if (selectedOutcomes[market.conditionId] != null) {
          const selectedOutcome = parseInt(
            selectedOutcomes[market.conditionId],
            10
          );

          if (assumptions.includes(market.conditionId)) {
            assumedIndexes.push(totalOutcomeIndex + selectedOutcome);
          } else {
            outcomeIndexes.push(totalOutcomeIndex + selectedOutcome);
          }
        }

        totalOutcomeIndex += market.outcomes.length;
      });

      // outcome ids:   Ay, .... By, ... Bn
      // atomic outcomes: AyByCn "outcomePairs"

      const outcomePairs = await listOutcomePairsMatchingOutcomeId([
        ...outcomeIndexes,
        ...assumedIndexes
      ]);
      const assumedPairs =
        assumedIndexes.length > 0
          ? await listOutcomePairsMatchingOutcomeId(assumedIndexes, true)
          : [];

      const outcomeTokenCounts = await calcOutcomeTokenCounts(
        outcomePairs,
        assumedPairs,
        amount
      );
      await setOutcomeTokenBuyAmounts(outcomeTokenCounts);

      const newPrices = await loadMarginalPrices(outcomeTokenCounts);
      const predictionProbabilities = await loadProbabilitiesForPredictions(
        newPrices
      );

      setPredictionProbabilities(predictionProbabilities);
      // console.log("tokens purchase list:")
      // console.log(outcomeTokenCounts)
      setStagedPositions(true);
    },
    handleCheckBalance: ({ setBuyError }) => async (invest) => {
      const { collateral } = await loadConfig()
      const collateralProps = await loadCollateral()

      const collateralDecimalDenominator = new Decimal(10).pow(collateralProps.decimals || 18)

      const investWei = (new Decimal(invest)).mul(collateralDecimalDenominator)
      // only needed for WETH? todo
      //const gasEstimate = new Decimal(500000).mul(1e10) // 500.000 gas * 10 gwei gasprice as buffer for invest

      const collateralBalance = await getCollateralBalance()
      const collateralBalanceDecimal = new Decimal(collateralBalance.toString())

      const hasEnough = investWei.lte(collateralBalanceDecimal)

      if (!hasEnough) {
        setBuyError(`Sorry, you don't have enough balance of ${collateralProps.name}. You're missing ${investWei.sub(collateralBalanceDecimal).dividedBy(collateralDecimalDenominator).toSD(4).toString()} ${collateralProps.symbol}`)
      } else {
        setBuyError(false)
      }
    }
  }),
  withHandlers({
    handleSelectAssumption: ({
      markets,
      assumptions,
      removeAssumption,
      addAssumption,
      handleUpdateMarkets,
      handleUpdateOutcomeTokenCounts,
      invest
    }) => async conditionId => {
      if (assumptions.includes(conditionId)) {
        await removeAssumption(conditionId);
      } else {
        if (assumptions.length < markets.length - 1) {
          await addAssumption(conditionId);
        } else {
          alert(
            "You can't make assumptions on all markets at once. You need to make atleast one prediction."
          );
        }
      }

      await handleUpdateMarkets();
      await handleUpdateOutcomeTokenCounts(invest || "0");
    },
    handleSelectOutcome: ({
      assumptions,
      removeAssumption,
      selectOutcomes,
      handleUpdateMarkets,
      handleUpdateAffectedOutcomes,
      handleUpdateOutcomeTokenCounts,
      invest
    }) => async e => {
      const [conditionId, outcomeIndex] = e.target.name.split(/[\-\]]/g);
      await selectOutcomes(conditionId, outcomeIndex);

      if (outcomeIndex === undefined && assumptions.includes(conditionId)) {
        await removeAssumption(conditionId);
      }

      await handleUpdateAffectedOutcomes();
      await handleUpdateMarkets();
      (await handleUpdateOutcomeTokenCounts(invest)) || "0";
    },
    handleSelectInvest: ({
      setInvest,
      handleUpdateOutcomeTokenCounts,
      handleCheckBalance,
    }) => e => {
      const asNum = parseFloat(e.target.value);

      const isEmpty = e.target.value === "";
      const validNum = !isNaN(asNum) && isFinite(asNum) && asNum > 0;

      setInvest(e.target.value);

      if (!isEmpty && validNum) {
        handleUpdateOutcomeTokenCounts(asNum);
      }
      if (!isEmpty && validNum) {
        handleCheckBalance(asNum);
      }
    },
    handleBuyOutcomes: ({
      markets,
      setMarkets,
      setPrices,
      setPositionIds,
      setPositions,
      setBalances,
      outcomeTokenBuyAmounts,
      invest,
      setBuyingStatus,
      setBuyError,
      handleUpdateOutcomeTokenCounts
    }) => async () => {
      setBuyingStatus(true);
      setBuyError("");
      try {
        await buyOutcomes(outcomeTokenBuyAmounts);

        const newPrices = await loadMarginalPrices();
        await setPrices(newPrices);
        const positionIds = await loadPositions();
        await setPositionIds(positionIds);
        const balances = await loadBalances(positionIds);
        await setBalances(balances);
        const newMarkets = await loadMarkets(newPrices);
        await setMarkets(newMarkets);
        const positions = await generatePositionList(balances);
        await setPositions(positions);

        await handleUpdateOutcomeTokenCounts(invest || "0");
        setBuyingStatus(false);
      } catch (err) {
        setBuyError(err.message);
        setBuyingStatus(false);
      }
    },
    handleSellOutcomes: ({
      markets,
      setMarkets,
      setPositionIds,
      setBalances,
      setPositions,
      invest,
      selectedOutcomes
    }) => async () => {
      const outcomeIndexes = [];

      Object.keys(selectedOutcomes).forEach(conditionId => {
        const market = find(markets, { conditionId });

        if (!market) throw new Error("Market not found, wtf?");
        const marketOutcomeIndex = selectedOutcomes[conditionId];

        outcomeIndexes.push(
          market.outcomes[marketOutcomeIndex].lmsrOutcomeIndex
        );
      });
      // console.log(
      //   "handleSellOutcomes -> outcomeIndexes: ",
      //   JSON.stringify(outcomeIndexes, null, 2)
      // );
      await sellOutcomes(outcomeIndexes, invest);
      const prices = await loadMarginalPrices();
      const updatedMarkets = await loadMarkets(prices);
      // console.log(markets)
      setMarkets(updatedMarkets);

      const positionIds = await loadPositions();
      await setPositionIds(positionIds);

      const balances = await loadBalances(positionIds);
      await setBalances(balances);

      const positions = await generatePositionList(balances);
      await setPositions(positions);
    },
    handleSellPositions: ({
      setMarkets,
      setPositionIds,
      setBalances,
      setPositions,
    }) => async (atomicOutcomes, amount) => {
      await sellOutcomes(atomicOutcomes, amount);
      const prices = await loadMarginalPrices();
      const updatedMarkets = await loadMarkets(prices);
      // console.log(markets)
      setMarkets(updatedMarkets);

      const positionIds = await loadPositions();
      await setPositionIds(positionIds);

      const balances = await loadBalances(positionIds);
      await setBalances(balances);

      const positions = await generatePositionList(balances);
      await setPositions(positions);
    }
  }),
  loadingHandler
);

export default enhancer(Page);
