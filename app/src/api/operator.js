const conf = require("conf");
const { OPERATOR_API_URL, network } = conf;

import { createQueryString } from "./util";

const getQuestionsMock = () => {
  return { results: conf.markets };
};

export const getQuestions = async ({ status, lmsrAddress, limit, offset }) => {
  if (network === "local") {
    return getQuestionsMock();
  }

  const apiUrl = `${OPERATOR_API_URL}/v1/questions/`;
  const params = {
    status,
    market_maker: lmsrAddress,
    limit,
    offset
  };

  const queryString = createQueryString(params);

  const url = apiUrl + "?" + queryString;

  return fetch(url).then(response => {
    return response.json();
  });
};

export const getMarketMakers = async ({
  status,
  factory,
  lmsrAddress,
  limit,
  offset
}) => {
  if (network === "local") {
    return getQuestionsMock();
  }

  const apiUrl = `${OPERATOR_API_URL}/v1/market-makers/`;
  const params = {
    status,
    factory,
    address: lmsrAddress,
    limit,
    offset
  };

  const queryString = createQueryString(params);

  const url = apiUrl + "?" + queryString;

  return fetch(url).then(response => {
    return response.json();
  });
};
