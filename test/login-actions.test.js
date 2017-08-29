import {initLogin, INIT_LOGIN} from '../src/login-actions'

const expect = global.expect

describe('Login Actions Testing', () => {
  it('Should test initLogin', () => {
    expect(initLogin({
               email: 'test@localhost.com',
               password: 'password'
              }).type).to.equal(INIT_LOGIN)
  })
})