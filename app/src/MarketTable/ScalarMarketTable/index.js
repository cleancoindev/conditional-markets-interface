import React, { useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import Web3 from "web3";
import cn from "classnames/bind";
import Decimal from "decimal.js-light";
import { useQuery } from "@apollo/react-hooks";

import Markdown from "react-markdown";

import style from "./marketTable.scss";
import ResolutionTime from "./ResolutionTime";
import Spinner from "components/Spinner";
import Graph from "components/Graph";

import { markdownRenderers } from "utils/markdown";
import {
  getMarketProbabilities,
  getStagedMarketProbabilities
} from "utils/probabilities";
import { formatCollateral } from "utils/formatting";

import { GET_TRADES_BY_MARKET_MAKER } from "api/thegraph";

import prepareTradesData from "../utils/prepareTradesData";

const { BN } = Web3.utils;

const cx = cn.bind(style);

const MarketTable = ({
  markets,
  positions,
  lmsrState,
  // FIXME `useQuery` hook can't be used after checking if lmsrState exists.
  // Remove and use address from state if we divide this component in smaller ones
  lmsrAddress,
  marketSelections,
  // setMarketSelections,
  resetMarketSelections,
  stagedTradeAmounts,
  collateral
}) => {
  useEffect(() => {
    resetMarketSelections();
    // FIXME This breaks when reloading component after market maker address update
    // return () => {
    //   setMarketSelections(null);
    // };
  }, [markets]);
  const [isExpanded, setExpanded] = useState(false);
  const [marketProbabilities, setMarketProbabilities] = useState(null);
  const [stagedMarketProbabilities, setStagedMarketProbabilities] = useState(
    null
  );
  const handleToggleExpand = useCallback(() => {
    setExpanded(!isExpanded);
  }, [isExpanded]);

  const { loading, error, data } = useQuery(GET_TRADES_BY_MARKET_MAKER, {
    variables: { marketMaker: lmsrAddress },
    pollInterval: 15000
  });

  useEffect(() => {
    if (lmsrState != null && marketSelections != null) {
      const { funding, positionBalances } = lmsrState;

      const {
        invB,
        positionProbabilities,
        newMarketProbabilities
      } = getMarketProbabilities(
        funding,
        positionBalances,
        markets,
        positions,
        marketSelections
      );
      setMarketProbabilities(newMarketProbabilities);

      if (stagedTradeAmounts != null) {
        const marketProbabilitiesAfterStagedTrade = getStagedMarketProbabilities(
          {
            positionProbabilities,
            invB,
            stagedTradeAmounts,
            markets,
            positions,
            marketSelections
          }
        );
        setStagedMarketProbabilities(marketProbabilitiesAfterStagedTrade);
      } else {
        setStagedMarketProbabilities(null);
      }
    }
  }, [lmsrState, markets, positions, marketSelections, stagedTradeAmounts]);

  const getValueFromBounds = useCallback((value, upperBound, lowerBound) => {
    // Value is a percentage of outcome tokens, should get the value
    // that it represents compared with bounds
    return [
      value
        .mul(upperBound - lowerBound)
        .add(lowerBound)
        .toNumber()
    ];
  }, []);

  // update trades on input-change
  const tradesByMarketIndex = useMemo(() => {
    if (!error && !loading && data) {
      return markets.map(({ lowerBound, upperBound, type }) => {
        return prepareTradesData({ lowerBound, upperBound, type }, data);
      });
    }
    return [];
  }, [markets, data, loading, error]);

  // update probabilities on input-change
  const probabilitiesByMarketIndex = useMemo(() => {
    if (marketProbabilities) {
      return markets.map(({ upperBound, lowerBound }, index) => {
        return stagedMarketProbabilities && stagedMarketProbabilities[index]
          ? getValueFromBounds(
              stagedMarketProbabilities[index][1],
              upperBound,
              lowerBound
            )
          : getValueFromBounds(
              marketProbabilities[index][1],
              upperBound,
              lowerBound
            );
      });
    }
    return [];
  }, [markets, marketProbabilities, stagedMarketProbabilities]);

  if (!lmsrState || !marketProbabilities) {
    return <Spinner />;
  }

  if (loading) return <Spinner width={32} height={32} />;
  if (error) throw new Error(error);

  return (
    <div className={cx("markettable")}>
      {markets.map(
        (
          {
            conditionId,
            title,
            resolutionDate,
            dataSource,
            dataSourceUrl,
            lowerBound,
            upperBound,
            decimals,
            unit,
            description,
            created,
            type
          },
          index
        ) => (
          <div className={cx("markettable-row")} key={`market-${conditionId}`}>
            <div className={cx("header")}>{title}</div>
            <div className={cx("subheader")}>
              <div className={cx("property")}>
                <i className={cx("icon", "icon-time")} />{" "}
                <ResolutionTime date={resolutionDate} />
              </div>
              {dataSource && (
                <div className={cx("property")}>
                  <i className={cx("icon", "icon-oracle")} />
                  <>
                    {dataSourceUrl ? (
                      <a
                        className={cx("link-oracle")}
                        href={dataSourceUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {dataSource}
                      </a>
                    ) : (
                      <>{dataSource}</>
                    )}
                  </>
                </div>
              )}
              <div className={cx("property")}>
                <i className={cx("icon", "icon-volume")} />{" "}
                {formatCollateral(lmsrState.funding, collateral)}
              </div>
            </div>
            <div className={cx("prediction")}>
              <Graph
                lowerBound={lowerBound}
                upperBound={upperBound}
                decimals={decimals}
                unit={unit}
                entries={tradesByMarketIndex[index]}
                resolutionDate={resolutionDate}
                created={created}
                currentProbability={probabilitiesByMarketIndex[index]}
                marketType={type}
              />
            </div>
            <div className={cx("details")}>
              <div className={cx("details-header")}>
                <button
                  type="button"
                  className={cx("details-expand")}
                  onClick={handleToggleExpand}
                >
                  Market Details
                  <span className={cx("expand-button")}>
                    {isExpanded ? "–" : "+"}
                  </span>
                </button>
              </div>
              <div
                className={cx("details-content", {
                  hidden: !isExpanded
                })}
              >
                {dataSource && (
                  <>
                    <h1>Data Source</h1>
                    {dataSourceUrl ? (
                      <a
                        href={dataSourceUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {dataSource}
                      </a>
                    ) : (
                      <>{dataSource}</>
                    )}
                  </>
                )}
                <Markdown
                  className={cx("description")}
                  source={description || "*No Description for this Market*"}
                  renderers={markdownRenderers}
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

MarketTable.propTypes = {
  markets: PropTypes.arrayOf(
    PropTypes.shape({
      conditionId: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  marketResolutionStates: PropTypes.array,
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
  lmsrAddress: PropTypes.string.isRequired,
  lmsrState: PropTypes.shape({
    marketMakerAddress: PropTypes.string.isRequired,
    funding: PropTypes.instanceOf(BN).isRequired,
    positionBalances: PropTypes.arrayOf(PropTypes.instanceOf(BN).isRequired)
      .isRequired
  }),
  marketSelections: PropTypes.arrayOf(
    PropTypes.shape({
      selectedOutcomeIndex: PropTypes.number,
      isAssumed: PropTypes.bool.isRequired
    }).isRequired
  ),
  resetMarketSelections: PropTypes.func.isRequired,
  setMarketSelections: PropTypes.func.isRequired,
  stagedTradeAmounts: PropTypes.arrayOf(
    PropTypes.instanceOf(Decimal).isRequired
  ),
  collateral: PropTypes.shape({
    decimals: PropTypes.number,
    symbol: PropTypes.string
  }).isRequired
};

export default MarketTable;
