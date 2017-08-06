import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render () {
    return (
      <div>React App in the house!</div>
    )
  }
}

ReactDOM.render(
  <App></App>,
  document.getElementById('react-app')
)