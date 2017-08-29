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