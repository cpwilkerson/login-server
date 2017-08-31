import {default as React} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {initialize, postLogin} from './login-actions'

class LoginView extends React.Component { // eslint-disable-line no-unused-vars
  constructor (props) {
    super(props)
    this.handleInitLogin = this.handleInitLogin.bind(this)
    this.handleCancelLogin = this.handleCancelLogin.bind(this)
  }

  handleInitLogin (event) {
    event.preventDefault()
    this.props.postLogin()
  }

  handleCancelLogin (event) {
    event.preventDefault()
    this.props.cancelLogin()
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
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email" ></input>
              <small id="emailHelp" className="form-text text-muted">
                We&apos;ll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group panel-body center-block">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"/>
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
    postLogin: () => dispatch(postLogin(dispatch)),
    cancelLogin: () => dispatch(initialize())
  }
}

export {LoginView, mapStateToProps, mapDispatchToProps}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)