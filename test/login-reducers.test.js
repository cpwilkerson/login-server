import login from '../src/login-reducers'
import {INIT_LOGIN} from '../src/login-actions'

const expect = global.expect

describe('Login Reducer Testing', () => {
  it('INIT_LOGIN should return isLogginIn=true', () => {
    expect(login({}, {type: INIT_LOGIN}).isLoggingIn).to.equal(true)
  })
  it('should test defaults - return isLogginIn=false', () => {
    expect(login().isLoggingIn).to.equal(false)
  })
  it('should test no params passed to login return isLogginIn=true', () => {
    expect(login({isLoggingIn: false}, {type: ''}).isLoggingIn).to.equal(false)
  })

})