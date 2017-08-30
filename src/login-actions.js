export const INIT_LOGIN = 'INIT_LOGIN'
export const INITIALIZE = 'INITIALIZE'


/**
 * Action creator for posting a login request.
 * @param {object} data Login data
 * @returns {object} INIT_LOGIN object
 */
export function initLogin (data) {
  return {
    type: INIT_LOGIN,
    data
  }
}

/**
 * Action creator for initializing the store.
 * @returns {object} INITIALIZE object
 */
export function initialize () {
  return {type: INITIALIZE}
}

/**
 * Action creator to POST a login to server
 * 
 * @param {any} dispatch redux dispatch function
 * @returns {function} function to be returned later
 */
export function postLogin (dispatch) {
  // Send immediate feedback to the user
  dispatch(initLogin())

  // Post the login
  return () => {
    setTimeout(() => {
      dispatch(initialize())
    }, 5000)
  }
}