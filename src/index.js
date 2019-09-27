import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { store, localHistory } from './store'

import App from 'containers/App'
import Home from 'containers/Home'
import Pool from 'containers/Pool'

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={localHistory}>
      <HashRouter>
        <Route render={({ location, history }) => {
          return (<App history={history} location={location}>
            <Switch>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/pool" component={Pool}/>
              <Redirect from='/' to='/home'/>
            </Switch>
          </App>)
        }}/>
      </HashRouter>
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'))