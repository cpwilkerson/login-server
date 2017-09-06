
// export const GET_CONTENT = 'GET_CONTENT'
export const GETTING_CONTENT = 'GETTING_CONTENT'
export const INITIALIZE = 'INITIALIZE'
export const AUTHORIZED = 'AUTHORIZED'

/**
 * Action creator for getting content.
 * @returns {object} GETTING_CONTENT object
 */
export function gettingContent () {
  return {type: GETTING_CONTENT}
}


/**
 * Action creator for receiving login results from the server
 *
 * @param {object} dispatch Store Dispatch 
 * @param {object} data Server data
 * @returns {object} action object
 */
export function getAuthorized (dispatch, data) {
  console.log('getAuthorized', data)
  if (data.authorized) {
    return {
      type: AUTHORIZED,
      userName: data.userName,
      isAuthorized: data.authorized
    }
  }

  return () => {
    console.log('redirect to...', data)
    // console.log('window.location', window.location)
    window.location.href = data.url
    window.sessionStorage.setItem('login-server-token', '')
  }
}

const APP_URI = 'http://localhost'

/**
 * Action creator for requesting content from the server.
 * @param {object} data Token data - if it exists
 * @param {object} dispatch Redux dispatcher
 * @returns {object} INIT_LOGIN object
 */
export function getContent (data, dispatch) {
  console.log('get content')
  dispatch(gettingContent())

  // Post the login
  return () => {
    console.log('fetching authorize...token', window.localStorage.getItem('login-server-token'))
    fetch(`${APP_URI}/authorize`, {
      method: 'POST',
      body: JSON.stringify({
        token: window.localStorage.getItem('login-server-token')
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
          errorMsg: JSON.stringify(error)
        }
      }
    ).
    then((json) => {
      console.log('fetched authorize', json)
      dispatch(getAuthorized(dispatch, json))
    })
  }
}

/**
 * Action creator for initializing the store.
 * @returns {object} INITIALIZE object
 */
export function initialize () {
  return {type: INITIALIZE}
}