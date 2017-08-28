export const POST_LOGIN = 'POST_LOGIN'
export const INITIALIZE = 'INITIALIZE'


/**
 * Action creator for posting a login request.
 * @param {object} data Login data
 * @returns {object} POST_LOGIN object
 */
export function postLogin (data) {
  return {
    type: POST_LOGIN,
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