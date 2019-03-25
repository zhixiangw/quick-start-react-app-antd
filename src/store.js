import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import promiseMiddleware from 'redux-promise-middleware'

import AppReducer from 'containers/App/reducer'

const reducers = {
  AppReducer
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
