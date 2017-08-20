export const POST_LOGIN = 'POST_LOGIN'


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