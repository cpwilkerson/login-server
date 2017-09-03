// import fetch from 'isomorphic-fetch'

export const INIT_LOGIN = 'INIT_LOGIN'
export const INITIALIZE = 'INITIALIZE'
export const LOGIN_RESULT = 'LOGIN_RESULT'


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
 * Action creator for receiving login results from the server
 *
 * @param {object} dispatch Store Dispatch 
 * @param {object} data Server data
 * @returns {object} action object
 */
export function loginResult (dispatch, data) {
  dispatch(initialize())

  return () => {
    // console.log('redirect to...', data)
    // console.log('window.location', window.location)
    window.location.href = data.url
    window.sessionStorage.setItem('login-server-token',
                                  data.token)
  }
}

const LOGIN_URI = 'http://localhost:3000/login'

/**
 * Action creator to POST a login to server
 * @param {object} data user and password
 * @param {any} dispatch redux dispatch function
 * @returns {function} function to be returned later
 */
export function postLogin (data, dispatch) {
  // Send immediate feedback to the user
  dispatch(initLogin())

  // Post the login
  return () => {
    fetch(LOGIN_URI, {
      method: 'POST',
      body: JSON.stringify({
        user: data.user,
        password: data.password
      }),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    }).
    then(
      (response) => response.json(),
      (error) => {
        return {
          url: '#failure',
          errorMsg: error
        }
      }
    ).
    then((json) => {
      dispatch(loginResult(dispatch, json))
    })
}
}