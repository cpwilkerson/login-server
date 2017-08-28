import React from 'react'
import ReactDOM from 'react-dom'
import LoginView from './login-view'
import login from './login-reducers'
import {postLogin, initialize} from './login-actions'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const store = createStore(login)

class App extends React.Component { // eslint-disable-line no-unused-vars
  constructor (props) {
    super(props)
    this.handlePostLogin = this.handlePostLogin.bind(this)
    this.handleCancelLogin = this.handleCancelLogin.bind(this)
  }

  handlePostLogin (event) {
    event.preventDefault()
    store.dispatch(postLogin())
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
          <LoginView postLogin={this.handlePostLogin}
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