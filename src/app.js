import React from 'react'
import ReactDOM from 'react-dom'
import LoginView from './login-view'
import login from './login-reducers'
import {initialize, postLogin} from './login-actions'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

const store = createStore(login, applyMiddleware(thunk))

class App extends React.Component { // eslint-disable-line no-unused-vars
  constructor (props) {
    super(props)
    this.handleInitLogin = this.handleInitLogin.bind(this)
    this.handleCancelLogin = this.handleCancelLogin.bind(this)
  }

  handleInitLogin (event) {
    event.preventDefault()
    store.dispatch(postLogin(store.dispatch))
  }

  handleCancelLogin (event) {
    event.preventDefault()
    store.dispatch(initialize())
  }

  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="jumbotron text-center">
            <h1>Login Screen</h1>
          </div>
        </div>
        <div className="row center-block">
          <LoginView initLogin={this.handleInitLogin}
                     cancelLogin={this.handleCancelLogin}/>
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