import {default as React} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getContent} from './app-actions'

class AppView extends React.Component { // eslint-disable-line no-unused-vars
  constructor (props) {
    super(props)
    this.checkAuthorized = this.checkAuthorized.bind(this)
  }

  componentDidMount () {
    this.checkAuthorized()
  }

  checkAuthorized () {
    this.props.getContent()
  }

  render () {
    var authorizedStatus = 'Unauthorized'

    if (this.props.isAuthorized) {
      authorizedStatus = `Authorized as ${this.props.userName}`
    }

    return (
      <div className="center-block">
        <div id="app-view">
          <div className="col-lg-2 col-md-1 col-sm-1" />
          <div className="col-sm-10 col-lg-8 panel panel-default center-block">
            <div className="form-group panel-body center-block">
              Content - {authorizedStatus}
            </div>
            <div className="col-sm-10 col-lg-8 panel-body center-block">
              <div className="btn-toolbar">
                Toolbar
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AppView.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  getContent: PropTypes.func.isRequired,
  userName: PropTypes.string
}

/**
 * mapStateToProps is used by the redux store to update the UI
 * 
 * @param {any} state component state
 * @returns {object} prop to state mapping
 */
function mapStateToProps (state) {
  return {
    isAuthorized: state.isAuthorized,
    userName: state.userName
  }
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
    getContent: (data) => dispatch(getContent(data, dispatch))
  }
}

export {AppView, mapStateToProps, mapDispatchToProps}

export default connect(mapStateToProps, mapDispatchToProps)(AppView)