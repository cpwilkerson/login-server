import {postLogin, POST_LOGIN} from '../src/login-actions'

const expect = global.expect

describe('Login Actions Testing', () => {
  it('Should test postLogin', () => {
    expect(postLogin({
               email: 'test@localhost.com',
               password: 'password'
              }).type).to.equal(POST_LOGIN)
  })
})