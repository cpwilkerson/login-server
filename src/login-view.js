import {default as React} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {initialize, postLogin} from './login-actions'

class LoginView extends React.Component { // eslint-disable-line no-unused-vars
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      password: ''
    }

    this.handleInitLogin = this.handleInitLogin.bind(this)
    this.handleCancelLogin = this.handleCancelLogin.bind(this)
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleInitLogin (event) {
    event.preventDefault()
    this.props.postLogin({
      user: this.state.userName,
      password: this.state.password
    })
  }

  handleCancelLogin (event) {
    event.preventDefault()
    this.props.cancelLogin()
  }

  handleUserNameChange (event) {
    this.setState({userName: event.target.value})
  }

  handlePasswordChange (event) {
    this.setState({password: event.target.value})
  }

  render () {
    var loginStatus = 'Submit'

    if (this.props.isLoggingIn) {
      loginStatus = 'Logging in...'
    }

    return (
      <div className="center-block">
        <form id="login-view" onSubmit={this.handleInitLogin}>
          <div className="col-lg-2 col-md-1 col-sm-1" />
          <div className="col-sm-10 col-lg-8 panel panel-default center-block">
            <div className="form-group panel-body center-block">
              <label htmlFor="userName">User Name</label>
              <input type="username"
                    className="form-control"
                    id="userName"
                    placeholder="Enter user name"
                    value={this.state.userName}
                    onChange={this.handleUserNameChange} />
            </div>
            <div className="form-group panel-body center-block">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange} />
            </div>
            <div className="col-sm-10 col-lg-8 panel-body center-block">
              <div className="btn-toolbar">
                <button type="submit" id="submit"
                        className="btn btn-primary center">
                  {loginStatus}
                </button>
                <button id="cancel"
                        className="btn btn-default center"
                        onClick={this.handleCancelLogin}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

LoginView.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
  postLogin: PropTypes.func.isRequired,
  cancelLogin: PropTypes.func.isRequired
}

/**
 * mapStateToProps is used by the redux store to update the UI
 * 
 * @param {any} state component state
 * @returns {object} prop to state mapping
 */
function mapStateToProps (state) {
  return {isLoggingIn: state.isLoggingIn}
}

/**
 * mapDispatchToProps is used by the redux store to map dispatch action creators
 * to the props within this component
 * 
 * @param {any} dispatch component state
 * @returns {object} prop to state mapping
 */
function mapDispatchToProps (dispatch) {
  return {
    postLogin: (data) => dispatch(postLogin(data, dispatch)),
    cancelLogin: () => dispatch(initialize())
  }
}

export {LoginView, mapStateToProps, mapDispatchToProps}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)