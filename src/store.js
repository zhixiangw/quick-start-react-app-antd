import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import promiseMiddleware from 'redux-promise-middleware'

import AppReducer from 'containers/App/reducer'
import OrderReducer from 'containers/Order/reducer'
import UserReducer from 'containers/User/reducer'
import CinemaReducer from 'containers/Cinema/reducer'
import VoucherReducer from 'containers/Voucher/reducer'
import MoviesReducer from 'containers/Movie/reducer'

const reducers = {
  AppReducer,
  OrderReducer,
  UserReducer,
  CinemaReducer,
  VoucherReducer,
  MoviesReducer,
}

const middleware = routerMiddleware(history)
const localHistory = createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  combineReducers({
    ...reducers,
    router: connectRouter(localHistory)
  }),
  composeEnhancers(applyMiddleware(middleware, promiseMiddleware))
)

export {
  store,
  localHistory
}
