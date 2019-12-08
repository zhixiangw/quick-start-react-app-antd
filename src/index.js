import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { store, localHistory } from './store'

import App from 'containers/App'
import Dashboard from 'containers/Dashboard'
import Cinema from 'containers/Cinema'
import Movie from 'containers/Movie'
import MovieScene from 'containers/MovieScene'
import Order from 'containers/Order'
import OrderDetail from 'containers/Order/OrderDetail'
import User from 'containers/User'
import Setting from 'containers/Setting'

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={localHistory}>
      <HashRouter>
        <Route render={({ location, history }) => {
          return (<App history={history} location={location}>
            <Switch>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/cinema" component={Cinema}/>
              <Route exact path="/movie" component={Movie}/>
              <Route exact path="/movie-scene" component={MovieScene}/>
              <Route exact path="/order" component={Order}/>
              <Route exact path="/order-detail/:orderId" component={OrderDetail}/>
              <Route exact path="/user" component={User}/>
              <Route exact path="/setting" component={Setting}/>
              <Redirect from='/' to='/dashboard'/>
            </Switch>
          </App>)
        }}/>
      </HashRouter>
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'))