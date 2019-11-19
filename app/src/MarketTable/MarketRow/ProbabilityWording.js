import React from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";

import style from "./probabilityWording.scss";

const cx = cn.bind(style);

const PROBABILITY_WORDING = [
  [[0, 1], "Impossible"],
  [[1, 5], "Remote"],
  [[5, 20], "Highly improbable"],
  [[20, 45], "Improbable"],
  [[45, 55], "Roughly even odds"],
  [[55, 80], "Probable"],
  [[80, 95], "Highly probable"],
  [[95, 99], "Nearly certain"],
  [[99, 100], "Certain"]
];

const getLabelWording = stagedProbability => {
  const selectedWording = PROBABILITY_WORDING.find(([[probFrom, probTo]]) => {
    return stagedProbability >= probFrom && stagedProbability < probTo;
  });
  const [, label] = selectedWording;

  return label;
};

const ProbabilityWording = ({
  outcomes,
  probabilities,
  stagedProbabilities
}) => {
  const displayedProbabilities = probabilities
    ? probabilities
    : stagedProbabilities;
  return (
    <div className={cx("wordings")}>
      {displayedProbabilities && (
        <>
          {outcomes.map((outcome, index) => {
            const stagedProbability = displayedProbabilities[index]
              .mul(100)
              .toNumber();

            const probabilityWording = getLabelWording(stagedProbability);

            return (
              <div
                className={cx("outcome-probability-wording")}
                key={outcome.short}
              >
                <span className={cx("words-of-probability")}>
                  {probabilityWording}
                </span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

ProbabilityWording.propTypes = {
  outcomes: PropTypes.arrayOf(PropTypes.object),
  probabilities: PropTypes.arrayOf(PropTypes.number),
  stagedProbabilities: PropTypes.arrayOf(PropTypes.object)
};

export default ProbabilityWording;
