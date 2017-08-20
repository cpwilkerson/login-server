import React from 'react'
import ReactDOM from 'react-dom'
import LoginView from './login-view'

class App extends React.Component { // eslint-disable-line no-unused-vars
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="jumbotron text-center">
            <h1>Login Screen</h1>
          </div>
        </div>
        <div className="row center-block">
          <LoginView />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App></App>,
  document.getElementById('react-app')
)