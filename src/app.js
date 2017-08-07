import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component { // eslint-disable-line no-unused-vars
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="jumbotron text-center">
            <h1>Login Screen</h1>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App></App>,
  document.getElementById('react-app')
)