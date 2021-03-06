import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
// import { History } from "history";
// import { ActionType } from 'typesafe-actions';

// import { StoreState } from '../util/types';

// import * as actions from './actions'
// import { blockchain } from './blockchain/reducers'
// import { market } from './market/reducers';
// import { relayer } from './relayer/reducers';
// import { ui } from './ui/reducers';

// export type RootAction = ActionType<typeof actions>;

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history)
    // blockchain,
    // relayer,
    // ui,
    // market
  });
