// Importing this globally to fix regeneratorRuntime error with babel-preset-env
// and async/await code
import "regenerator-runtime/runtime";

// Router
import { ConnectedRouter } from "connected-react-router";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

// CSS Reset
import "normalize.css/normalize.css";
// Base Style (loads fonts)
import "./scss/style.scss";

import Decimal from "decimal.js-light";

// Debug Re-rendering
if (process.env.NODE_ENV !== "production") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React);
}

// Routes
import Routes from "./Routes";

import { history, store } from "./store";

Decimal.config({
  precision: 80,
  toExpPos: 50,
  rounding: Decimal.ROUND_FLOOR
});

const RouterWrappedApp = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

const rootElement = document.getElementById("root");
render(RouterWrappedApp, rootElement);
