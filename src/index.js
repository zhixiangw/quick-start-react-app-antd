import './styles.less'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { store, localHistory } from './store'

import App from 'containers/App'
import Home from 'containers/Home'
import Page1 from 'containers/Page1'
import Page2 from 'containers/Page2'

const tempHistory = [window.location.href]
let browserAction = 'POP'

window.addEventListener('hashchange', (HashChangeEvent) => {
  const { newURL, oldURL } = HashChangeEvent
  const idx = tempHistory.indexOf(newURL)
  // 浏览器按钮后退
  if (idx && (tempHistory.indexOf(oldURL) === idx - 1)) {
    browserAction = 'PUSH'
  } else {
    browserAction = 'POP'
  }
})

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={localHistory}>
      <HashRouter>
        <Route render={({ location, history }) => {
          let cls = history.action === 'POP' ? 'slide-right' : 'slide-left'
          if (browserAction === 'PUSH') {
            cls = 'slide-left'
          }
          if (history.action === 'PUSH') {
            tempHistory.push(window.location.href)
          }
          return (
            <TransitionGroup className={cls}>
              <CSSTransition key={location.pathname} classNames="animation" timeout={304}>
                <Switch location={location}>
                  <Route exact path="/app" component={App}/>
                  <Route exact path="/home" component={Home}/>
                  <Route exact path="/page1" component={Page1}/>
                  <Route exact path="/page2" component={Page2}/>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )
        }}/>
      </HashRouter>
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'))