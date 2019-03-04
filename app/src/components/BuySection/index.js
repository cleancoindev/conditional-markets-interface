import React from "react";
import classnames from "classnames/bind";
import Decimal from "decimal.js";
import Spinner from "components/Spinner";

import style from "./style.scss";

const cx = classnames.bind(style);

const BuySection = ({
  handleBuyOutcomes,
  handleSelectInvest,
  invest,
  selectionPrice,
  validPosition,
  outcomeTokenBuyAmounts,
  isBuying,
  buyError
}) => (
  <div className={cx("positions")}>
    <input
      type="text"
      placeholder="Your Invest in ETH"
      value={invest}
      onChange={handleSelectInvest}
    />
    <button
      type="button"
      disabled={!validPosition || isBuying}
      onClick={handleBuyOutcomes}
    >
      {isBuying ? <Spinner centered inverted width={25} height={25} /> : "Buy"}
    </button>
    {buyError && <span className={cx("error")}>An error has occured</span>}
  </div>
);

BuySection.defaultProps = {
  invest: "",
  selectionPrice: 0,
  outcomeTokenBuyAmounts: [],
  isBuying: false,
  buyError: ""
};

export default BuySection;