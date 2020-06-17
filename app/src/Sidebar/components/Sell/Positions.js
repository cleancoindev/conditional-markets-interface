import React from "react";
import cn from "classnames/bind";
import Decimal from "decimal.js-light";
import style from "./positions.scss";

import useGlobalState from "hooks/useGlobalState";

import OutcomeCard, { Dot } from "components/OutcomeCard";
import Spinner from "components/Spinner";

import { formatCollateral, formatAmount } from "utils/formatting";

const cx = cn.bind(style);

const Positions = ({
  positionGroups,
  setError,
  ongoingTransactionType,
  probabilities,
  positionBalances,
  estimatedSaleEarnings,
  makeOutcomeSellSelectHandler,
  error
}) => {
  const { collateral } = useGlobalState();

  if (positionGroups === null) {
    return (
      <div className={cx("positions-empty")}>
        <Spinner width={25} height={25} centered />
      </div>
    );
  }

  return (
    <div className={cx("positions")}>
      {positionGroups.length === 0 && (
        <div className={cx("positions-empty")}>You have no positions.</div>
      )}
      {positionGroups.length > 0 && (
        <table className={cx("position-entries-table")}>
          <thead>
            <tr>
              <td>Position</td>
              <td>Outcome Tokens</td>
              {/* <td>Current Value</td> */}
              <td>Sell Price</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {positionGroups.map((positionGroup, index) => {
              const outcomeIndex = positionGroup.outcomeSet[0].outcomeIndex;

              return (
                <tr key={index}>
                  <td>
                    {positionGroup.outcomeSet.length === 0 && (
                      <OutcomeCard
                        {...positionGroup.positions[0].outcomes[0]}
                        outcomeIndex={-1}
                        marketIndex="*"
                        title={"Any"}
                        prefixType="IF"
                      />
                    )}
                    {positionGroup.outcomeSet.map(outcome => (
                      <span
                        key={`${outcome.marketIndex}-${outcome.outcomeIndex}`}
                      >
                        <Dot index={outcome.outcomeIndex} />
                        {outcome.title[0].toUpperCase() +
                          outcome.title.slice(1)}
                      </span>
                    ))}
                  </td>
                  <td>
                    {formatAmount(
                      new Decimal(
                        positionBalances[outcomeIndex].toString()
                      ).div(1e18)
                    )}
                  </td>
                  {/* <td>
                    {probabilities &&
                    probabilities[positionGroup.outcomeSet[0].marketIndex] ? (
                      formatCollateral(
                        new Decimal(
                          positionBalances[outcomeIndex].toString()
                        ).mul(
                          probabilities[
                            positionGroup.outcomeSet[0].marketIndex
                          ][outcomeIndex]
                        ),
                        collateral
                      )
                    ) : (
                      <Spinner width={12} height={12} />
                    )}
                  </td> */}
                  <td>
                    {estimatedSaleEarnings.length ? (
                      formatCollateral(
                        estimatedSaleEarnings[outcomeIndex],
                        collateral
                      )
                    ) : (
                      <Spinner width={12} height={12} />
                    )}
                  </td>
                  <td>
                    <button
                      className={cx("position-sell")}
                      type="button"
                      disabled={
                        ongoingTransactionType === "sell outcome tokens"
                      }
                      onClick={makeOutcomeSellSelectHandler(positionGroup)}
                    >
                      {ongoingTransactionType === "sell outcome tokens" ? (
                        <Spinner width={16} height={16} centered inverted />
                      ) : (
                        "Sell"
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {error != null && <span className={cn("error")}>{error.message}</span>}
    </div>
  );
};

export default Positions;
