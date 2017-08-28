import {POST_LOGIN, INITIALIZE} from './login-actions'

const initialState = {isLoggingIn: false}

/**
 * Reducer for login actions
 * @param {object} state state 
 * @param {object} action sent action
 * @return {object} new state
 */
function login (state = initialState, action) {
  if (action) {
    switch (action.type) {
      case POST_LOGIN:
        return Object.assign({}, {isLoggingIn: true})
      case INITIALIZE:
        return Object.assign({}, initialState)
      default:
        return Object.assign({}, initialState)
    }
  }

  return Object.assign({}, state)
}

export default login