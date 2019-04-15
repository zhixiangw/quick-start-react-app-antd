(function(history){
  var replaceState = history.replaceState
  var pushState = history.pushState
  history.replaceState = function() {
    setTimeout(() => appHistoryStack.splice(-1, 1, window.location.href), 0)
    replaceState.apply(history, arguments)
  };
  history.pushState = function() {
    setTimeout(() => appHistoryStack.push(window.location.href), 0)
    pushState.apply(history, arguments)
  };
})(window.history)

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

// 一个不准确的 appHistoryStack，不对外暴露接口，不能当做历史记录参考
const appHistoryStack = [window.location.href]
let useAppAction = true
let appAction = 'FORWARD'

window.addEventListener('hashchange', (HashChangeEvent) => {
  const { newURL, oldURL } = HashChangeEvent
  const newURLIndex = appHistoryStack.indexOf(newURL)
  const oldURLIndex = appHistoryStack.indexOf(oldURL)
  if (newURLIndex === -1) {
    appHistoryStack.push(newURL)
  }
  if (!useAppAction) {
    if (newURLIndex === -1 || newURLIndex - oldURLIndex > 0) {
      appAction = 'FORWARD'
    } else {
      appAction = 'GOBACK'
    }
  } else {
    useAppAction = true
  }
})

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={localHistory}>
      <HashRouter history={localHistory}>
        <Route render={({ location, history }) => {
          let animationClassName = ''
          if (['PUSH', 'REPLACE'].includes(history.action)) {
            useAppAction = false
            animationClassName = 'slide-left'
          } else {
            animationClassName = appAction === 'FORWARD' ? 'slide-left' : 'slide-right'
          }
          return (
            <TransitionGroup className={animationClassName}>
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