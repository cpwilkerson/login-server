import {AUTHORIZED, GETTING_CONTENT, INITIALIZE} from './app-actions'

const initialState = {
    isAuthorized: false,
    authorizedStatus: '',
    userName: ''
  }

/**
 * Reducer for login actions
 * @param {object} state state 
 * @param {object} action sent action
 * @return {object} new state
 */
function appReducer (state = initialState, action) {
  if (action) {
    switch (action.type) {
      case AUTHORIZED:
        return Object.assign({}, {
                                   isAuthorized: true,
                                   authorizedStatus: 'get result',
                                   userName: action.userName
                                 })
      case GETTING_CONTENT:
        return Object.assign({}, {
                                   isAuthorized: false,
                                   authorizedStatus: 'getting content...'
                                 })
      case INITIALIZE:
        return Object.assign({}, initialState)
      default:
        return Object.assign({}, initialState)
    }
  }

  return Object.assign({}, state)
}

export default appReducer