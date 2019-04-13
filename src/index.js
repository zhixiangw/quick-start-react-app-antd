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

// 页面刷新或者appinit的时候，action为pop，所以需要一个init的stack
const historyStack = [{ oldURL: null, newURL: window.location.href }]
const isExist = () => historyStack.find(v => v.oldURL === hashChangeOldURL && v.newURL === window.location.href)
let hashChangeOldURL = window.location.href
let browserAction = 'GOBACK'

window.addEventListener('hashchange', (HashChangeEvent) => {
  const { newURL, oldURL } = HashChangeEvent
  hashChangeOldURL = newURL
  console.log(HashChangeEvent, historyStack)
  // 浏览器forward按钮前进，相当于push操作，区别在于产生的action为 POP
  if (historyStack.find(v => v.oldURL === oldURL && v.newURL === newURL)) {
    browserAction = 'FORWARD'
  } else {
    browserAction = 'GOBACK'
  }
})

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={localHistory}>
      <HashRouter>
        <Route render={({ location, history }) => {
          let cls = history.action === 'POP' ? 'slide-right' : 'slide-left'
          if (browserAction === 'FORWARD' && history.action === 'POP') {
            cls = 'slide-left'
          }
          if (history.action === 'PUSH') {
            !isExist() && historyStack.push({ oldURL: hashChangeOldURL, newURL: window.location.href })
          }
          if (history.action === 'REPLACE') {
            const currentStack = historyStack.find(v => v.newURL === hashChangeOldURL)
            currentStack.newURL = window.location.href
          }
          console.table(historyStack)
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