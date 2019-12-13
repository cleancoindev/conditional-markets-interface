import React from "react";
import CategoricalMarketTable from "./CategoricalMarketTable";
import ScalarMarketTable from "./ScalarMarketTable";

const MarketTable = props => {
  const { markets } = props;
  if (markets && markets.length > 0) {
    if (markets[0].type === "CATEGORICAL") {
      return <CategoricalMarketTable {...props} />;
    } else if (markets[0].type === "SCALAR") {
      return <ScalarMarketTable {...props} />;
    } else {
      throw Error("Unknown market type");
    }
  }

  return null;
};

export default MarketTable;
