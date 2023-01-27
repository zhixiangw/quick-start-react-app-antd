import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { store, localHistory } from './store';

import App from 'containers/App';
import Dashboard from 'containers/Dashboard';
import CinemaList from 'containers/Cinema';
import CinemaDetail from 'containers/Cinema/CinemaDetail';
import CinemaTags from 'containers/Cinema/CinemaTags';
import Movie from 'containers/Movie';
import MovieScene from 'containers/MovieScene';
import Order from 'containers/Order';
import OrderDetail from 'containers/Order/OrderDetail';
import Subscribe from 'containers/Cinema/Subscribe';
import SubscribeForm from 'containers/Cinema/Subscribe/Form';
import User from 'containers/User';
import UserDetail from 'containers/User/UserDetail';
import Setting from 'containers/Setting';
import VoucherMember from 'containers/Voucher/Member';
import VoucherMemberForm from 'containers/Voucher/Member/Form';
import VoucherMemberExport from 'containers/Voucher/Member/Export';
import VoucherMovieExport from 'containers/Voucher/Movie/Export';
import VoucherSnacks from 'containers/Voucher/Snacks';
import VoucherSnacksForm from 'containers/Voucher/Snacks/Form';
import VoucherMovie from 'containers/Voucher/Movie';
import VoucherMovieForm from 'containers/Voucher/Movie/Form';
import MemberCard from 'containers/Voucher/MemberCard';
import MemberCardForm from 'containers/Voucher/MemberCard/Form';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={localHistory}>
      <HashRouter>
        <Route
          render={({ location, history }) => {
            return (
              <App history={history} location={location}>
                <Switch>
                  <Route exact path='/dashboard' component={Dashboard} />
                  <Route exact path='/cinema/list' component={CinemaList} />
                  <Route
                    exact
                    path='/cinema/detail/:id'
                    component={CinemaDetail}
                  />
                  <Route exact path='/cinema/tags/:id' component={CinemaTags} />
                  <Route exact path='/cinema/subscribe' component={Subscribe} />
                  <Route
                    exact
                    path='/cinema/subscribeForm/:id'
                    component={SubscribeForm}
                  />
                  <Route exact path='/movie' component={Movie} />
                  <Route exact path='/movie-scene' component={MovieScene} />
                  <Route exact path='/order/list' component={Order} />
                  <Route
                    exact
                    path='/order/detail/:orderId'
                    component={OrderDetail}
                  />
                  <Route exact path='/user' component={User} />
                  <Route
                    exact
                    path='/user/detail/:orderId'
                    component={UserDetail}
                  />
                  <Route
                    exact
                    path='/voucher/movieList'
                    component={VoucherMovie}
                  />
                  <Route
                    exact
                    path='/voucher/movieForm/:id'
                    component={VoucherMovieForm}
                  />
                  <Route
                    exact
                    path='/voucher/snacksList'
                    component={VoucherSnacks}
                  />
                  <Route
                    exact
                    path='/voucher/snacksForm/:id'
                    component={VoucherSnacksForm}
                  />
                  <Route
                    exact
                    path='/voucher/memberList'
                    component={VoucherMember}
                  />
                  <Route
                    exact
                    path='/voucher/memberForm/:id'
                    component={VoucherMemberForm}
                  />
                  <Route
                    exact
                    path='/voucher/memberExport'
                    component={VoucherMemberExport}
                  />
                  <Route
                    exact
                    path='/voucher/movieExport'
                    component={VoucherMovieExport}
                  />
                  <Route
                    exact
                    path='/voucher/memberCard'
                    component={MemberCard}
                  />
                  <Route
                    exact
                    path='/voucher/memberCardForm/:id'
                    component={MemberCardForm}
                  />
                  <Route exact path='/setting' component={Setting} />
                  <Redirect from='/' to='/dashboard' />
                </Switch>
              </App>
            );
          }}
        />
      </HashRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
