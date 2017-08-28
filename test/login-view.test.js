import React from 'react'
import {default as LoginView} from '../src/login-view'
import login from '../src/login-reducers'
import {postLogin, initialize} from '../src/login-actions'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import {mount} from 'enzyme'

const expect = global.expect
const store = createStore(login)

/**
 * Utility to fire off postLogin function
 * @return {any} nothing
 */
function handlePostLogin () {
  store.dispatch(postLogin())
}

/**
 * Utility to fire off initialize function
 * @return {any} nothing
 */
function handleCancelLogin () {
  store.dispatch(initialize())
}

describe('login-view testing', () => {
  var loginView //eslint-disable-line

  describe('isLoggingIn is true', () => {

    before(() => {
      loginView = mount(
        <Provider store={store}>
          <LoginView postLogin={handlePostLogin}
                     cancelLogin={handleCancelLogin}/>
        </Provider>
      )
    })

    after(() => {
      store.dispatch(initialize())
      loginView.unmount()
    })

    it('should login-view submit', () => {
      const submitBtn = loginView.find('#submit')

      loginView.find('#login-view').simulate('submit')
      const count = submitBtn.length

      expect(count).to.equal(1)
      expect(loginView.find('#submit').text()).to.equal('Logging in...')
    })

    it('should login-view submit', () => {
      const cancelBtn = loginView.find('#cancel')

      loginView.find('#cancel').simulate('click')
      const count = cancelBtn.length

      expect(count).to.equal(1)
      expect(loginView.find('#submit').text()).to.equal('Submit')
    })
  })

  describe('isLoggingIn is false', () => {
    before(() => {
      loginView = mount(
        <Provider store={store}>
          <LoginView postLogin={handlePostLogin}
                     cancelLogin={handleCancelLogin}/>
        </Provider>
      )
    })

    after(() => {
      store.dispatch(initialize())
      loginView.unmount()
    })

    it('should render login-view', () => {
      const submitBtn = loginView.find('#submit')
      const count = submitBtn.length

      expect(count).to.equal(1)
      expect(submitBtn.text()).to.equal('Submit')
    })
  })
})