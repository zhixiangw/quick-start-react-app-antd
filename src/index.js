import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { store, localHistory } from './store'

import App from 'containers/App'
import Home from 'containers/Home'

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={localHistory}>
      <HashRouter>
        <Switch location={location}>
          <Route exact path="/app" component={App}/>
          <Route exact path="/home" component={Home}/>
        </Switch>
      </HashRouter>
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'))