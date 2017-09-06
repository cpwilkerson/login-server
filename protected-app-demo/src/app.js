import React from 'react'
import ReactDOM from 'react-dom'
import AppView from './app-view'
import appReducer from './app-reducers'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

const store = createStore(appReducer, applyMiddleware(thunk))

class App extends React.Component { // eslint-disable-line no-unused-vars
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="jumbotron text-center">
            <h1>Protected Web App</h1>
          </div>
        </div>
        <div className="row center-block">
          <AppView />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-app')
)