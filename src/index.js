import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { store, localHistory } from './store'

import ClassComponent from 'containers/ClassComponent'
import FunctionComponent from 'containers/FunctionComponent'
import useState from 'containers/FunctionComponent/useState'
import useEffect from 'containers/FunctionComponent/useEffect'
import useContext from 'containers/FunctionComponent/useContext'
import useReducer from 'containers/FunctionComponent/useReducer'
import useCallback from 'containers/FunctionComponent/useCallback'
import useRef from 'containers/FunctionComponent/useRef'

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={localHistory}>
      <HashRouter>
        <Switch>
          <Route exact path="/class-component" component={ClassComponent}/>
          <Route exact path="/function-component" component={FunctionComponent}/>
          <Route exact path="/function-component/useState" component={useState}/>
          <Route exact path="/function-component/useEffect" component={useEffect}/>
          <Route exact path="/function-component/useContext" component={useContext}/>
          <Route exact path="/function-component/useReducer" component={useReducer}/>
          <Route exact path="/function-component/useCallback" component={useCallback}/>
          <Route exact path="/function-component/useRef" component={useRef}/>
        </Switch>
      </HashRouter>
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'))