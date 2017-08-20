import {postLogin} from '../src/login-actions'

describe('Login Actions Testing', () => {
  it('Should test postLogin', () => {
    postLogin({
               email: 'test@localhost.com',
               password: 'password'
              })
  })
})