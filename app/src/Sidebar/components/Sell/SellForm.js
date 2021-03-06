import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Decimal from "decimal.js-light";
import Select from "react-select";
import Web3 from "web3";
import cn from "classnames/bind";

import useGlobalState from "hooks/useGlobalState";

import { Dot } from "components/OutcomeCard";
import Spinner from "components/Spinner";
import { zeroDecimal, collateralSignificantDigits } from "utils/constants";

import style from "./positions.scss";

const { toBN } = Web3.utils;

const cx = cn.bind(style);

const getBaseArray = length => {
  return Array(length).fill("0");
};

const SellForm = ({
  currentSellingPosition,
  onCancelSell,
  positions,
  positionBalances,
  ongoingTransactionType,
  setStagedTransactionType,
  setStagedTradeAmounts,
  conditionalTokensService,
  sellOutcomeTokens,
  onOutcomeChange,
  positionGroups,
  asWrappedTransaction,
  fee
}) => {
  const { collateral } = useGlobalState();

  const groupedSellAmounts = Array.from({ length: positions.length }, (_, i) =>
    currentSellingPosition.positions.find(
      ({ positionIndex }) => positionIndex === i
    ) == null
      ? zeroDecimal
      : currentSellingPosition.amount
  );
  const maxSellAmounts = groupedSellAmounts.map(
    amount => new Decimal(amount.toString())
  );

  const [selectOutcomeValue, setSelectOutcomeValue] = useState(null);
  const [sellAmountFullUnit, setSellAmountFullUnit] = useState("0");
  const [estimatedSaleEarning, setEstimatedSaleEarning] = useState(null);
  const [estimatedFee, setEstimatedFee] = useState(null);
  const [error, setError] = useState(null);
  const {
    outcomeIndex: selectedOutcomeIndex
  } = currentSellingPosition.outcomeSet[0]; // # 0 index because single markets for now
  const availableOutcomes = positionGroups.map(
    ({ outcomeSet: [outcome] }, index) => ({
      label: (
        <>
          <Dot index={outcome.outcomeIndex} />{" "}
          {outcome.title[0].toUpperCase() + outcome.title.slice(1)}
        </>
      ),
      value: index
    })
  );

  useEffect(() => {
    const findIndex = positionGroups.findIndex(
      ({ outcomeSet: [{ outcomeIndex }] }) => {
        return outcomeIndex === selectedOutcomeIndex;
      }
    );

    setSelectOutcomeValue(findIndex);
  }, [currentSellingPosition, availableOutcomes]);

  const setSellAmountToMax = useCallback(() => {
    const maxInvest = new Decimal(
      maxSellAmounts[selectedOutcomeIndex].toString()
    )
      .div(1e18)
      .toString();

    handleSellAmountChange(maxInvest);
    return maxInvest;
  }, [maxSellAmounts, setStagedTradeAmounts]);

  const updateEstimatedEarnings = useCallback(
    sellAmount => {
      setError(null);
      setEstimatedSaleEarning(null);
      setEstimatedFee(null);
      let balanceForThisPosition = getBaseArray(positionBalances.length);
      // Include in this call only the balance for this position
      // Note the negative value, it's because of being a sell price
      const isInvestingMoreThanAvailable = new Decimal(sellAmount)
        .mul(1e18)
        .gt(maxSellAmounts[selectedOutcomeIndex]);

      if (isInvestingMoreThanAvailable) {
        setError("You're investing more than you have available");
        balanceForThisPosition[selectedOutcomeIndex] = toBN(
          new Decimal(maxSellAmounts[selectedOutcomeIndex])
            .todp(0)
            .neg()
            .toint()
            .toString()
        );
      } else {
        balanceForThisPosition[selectedOutcomeIndex] = toBN(
          new Decimal(sellAmount)
            .mul(1e18)
            .neg()
            .toint()
            .toString()
        );
      }

      // Calculate the balance for this position
      // return as positive value for the frontend
      conditionalTokensService
        .calcNetCost(balanceForThisPosition)
        .then(tradeEarning => {
          const tradeEarningToDecimal = new Decimal(
            tradeEarning.abs().toString()
          )
            .div(Math.pow(10, collateral.decimals))
            .toSignificantDigits(collateralSignificantDigits);
          const tradeFee = tradeEarningToDecimal.mul(fee);

          setEstimatedSaleEarning(tradeEarningToDecimal);
          setEstimatedFee(tradeFee);
        });
    },
    [
      conditionalTokensService,
      maxSellAmounts,
      sellAmountFullUnit,
      positionBalances,
      positions,
      selectedOutcomeIndex,
      fee
    ]
  );

  // Update estimated earnings on first render
  useEffect(() => {
    setStagedTransactionType("sell outcome tokens");

    const maxInvest = setSellAmountToMax();
    updateEstimatedEarnings(maxInvest);
  }, [currentSellingPosition]);

  const handleSellAmountChange = useCallback(
    eventOrValue => {
      const value =
        typeof eventOrValue === "object"
          ? eventOrValue.target.value
          : eventOrValue;
      setSellAmountFullUnit(value);

      if (!isNaN(parseFloat(value)) && isFinite(parseFloat(value))) {
        const tradeAmountInWei = new Decimal(value)
          .mul(1e18)
          .neg()
          .toInteger();
        const tradeAmounts = getBaseArray(positions.length).map(
          n => new Decimal(n)
        );
        updateEstimatedEarnings(value);

        tradeAmounts[selectedOutcomeIndex] = tradeAmountInWei;
        setStagedTradeAmounts(tradeAmounts);
      }
    },
    [positions, setStagedTradeAmounts, maxSellAmounts]
  );

  if (maxSellAmounts.filter(dec => dec.abs().gt(0)).length > 1) {
    console.error("Can only handle single position");
    return (
      <div className={cx("sell")}>
        Invalid Market Configuration - An outcome has too many positions.
      </div>
    );
  }

  return (
    <div className={cx("sell")}>
      <div className={cx("sell-heading")}>
        Sell Position
        <button
          className={cx("sell-cancel")}
          type="button"
          onClick={onCancelSell}
        />
      </div>
      <div className={cx("sell-form")}>
        <div className={cx("sell-form-row")}>
          <label>Position</label>
          <div className={cx("entry")}>
            <Select
              options={availableOutcomes}
              value={availableOutcomes[selectOutcomeValue]}
              onChange={onOutcomeChange}
            />
          </div>
        </div>
        <div className={cx("sell-form-row")}>
          <label>Quantity</label>
          <div className={cx("entry")}>
            <div className={cx("input-group")}>
              <input
                type="string"
                readOnly
                value={maxSellAmounts[selectedOutcomeIndex]
                  .div(1e18)
                  .toSignificantDigits(4)
                  .toString()}
                className={cx("input")}
              />
              <span className={cx("input-append", "collateral-name")}>
                <abbr title="Outcome Tokens">OT</abbr>
              </span>
            </div>
          </div>
        </div>
        <div className={cx("sell-form-row")}>
          <label>Sell Quantity</label>
          <div className={cx("entry")}>
            <div className={cx("input-group")}>
              <button
                className={cx("input-append", "link-button", "invest-max")}
                onClick={setSellAmountToMax}
                type="button"
              >
                all
              </button>
              <input
                type="number"
                value={sellAmountFullUnit || ""}
                className={cx("input", { error: !!error })}
                onChange={handleSellAmountChange}
                min={0}
              />
              <span className={cx("input-append", "collateral-name")}>
                <abbr title="Outcome Tokens">OT</abbr>
              </span>
            </div>
          </div>
        </div>
        <div className={cx("sell-form-row")}>
          <label>Sell Price</label>
          <div className={cx("entry")}>
            <div className={cx("input-group")}>
              <input
                type="text"
                readOnly
                value={
                  estimatedSaleEarning ? estimatedSaleEarning.toString() : "..."
                }
                className={cx("input")}
              />
              <span className={cx("input-append", "collateral-name")}>
                <abbr title={collateral.name}>{collateral.symbol}</abbr>
              </span>
            </div>
          </div>
        </div>
        <div className={cx("sell-form-row")}>
          <label>Fee ({fee * 100}%)</label>
          <div className={cx("entry")}>
            <div className={cx("input-group")}>
              <input
                type="text"
                readOnly
                value={estimatedFee ? estimatedFee.toString() : "..."}
                className={cx("input")}
              />
              <span className={cx("input-append", "collateral-name")}>
                <abbr title={collateral.name}>{collateral.symbol}</abbr>
              </span>
            </div>
          </div>
        </div>
        <div className={cx("sell-form-row")}>
          <label>Total Sell Value</label>
          <div className={cx("entry")}>
            <div className={cx("input-group")}>
              <input
                type="text"
                readOnly
                value={
                  estimatedSaleEarning && estimatedFee
                    ? estimatedSaleEarning.sub(estimatedFee).toString()
                    : "..."
                }
                className={cx("input")}
              />
              <span className={cx("input-append", "collateral-name")}>
                <abbr title={collateral.name}>{collateral.symbol}</abbr>
              </span>
            </div>
          </div>
        </div>
        <div className={cx("sell-form-row")}>
          <label></label>
          <div className={cx("entry")}>
            <button
              className={cx("sell-confirm")}
              onClick={asWrappedTransaction(
                "sell outcome tokens",
                sellOutcomeTokens,
                setError
              )}
              disabled={ongoingTransactionType === "sell outcome tokens"}
            >
              {ongoingTransactionType === "sell outcome tokens" ? (
                <Spinner width={16} height={16} centered />
              ) : (
                "Sell"
              )}
            </button>
          </div>
        </div>
        {error && <div className={cx("sell-form-row")}>{error}</div>}
      </div>
    </div>
  );
};

SellForm.propTypes = {
  onCancelSell: PropTypes.func.isRequired,
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      positionIndex: PropTypes.number.isRequired,
      outcomes: PropTypes.arrayOf(
        PropTypes.shape({
          marketIndex: PropTypes.number.isRequired,
          outcomeIndex: PropTypes.number.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired,
  ongoingTransactionType: PropTypes.string,
  setStagedTransactionType: PropTypes.func.isRequired,
  setStagedTradeAmounts: PropTypes.func.isRequired,
  asWrappedTransaction: PropTypes.func.isRequired,
  fee: PropTypes.string.isRequired
};

export default SellForm;
