/* eslint-disable max-statements */
import React from 'react'
import {default as LoginView} from '../src/login-view'
import login from '../src/login-reducers'
import {postLogin, initialize} from '../src/login-actions'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import fetch from 'isomorphic-fetch'
import jwt from 'jsonwebtoken'

import {mount} from 'enzyme'

const expect = global.expect
const sinon = global.sinon
const store = createStore(login, applyMiddleware(thunk))

/**
 * Utility to fire off postLogin function
 * @return {any} nothing
 */
function handleInitLogin () {
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
          <LoginView />
        </Provider>
      )
    })

    after(() => {
      store.dispatch(initialize())
      loginView.unmount()
    })

    beforeEach(() => {
      sinon.stub(global, 'fetch').callsFake((apiCall, params) => {
        const parsedParams = JSON.parse(params.body)
        var res = {}

        if (parsedParams.password === 'password') {
          res.status = 200
          res.json = () => ({
            'token': jwt.sign({item1: 'here is item 1'},
                              'MyJWTSecret',
                              {expiresIn: 120}),
            'url': '#success'
          })

          return Promise.resolve(Object.assign({}, res))
        }
        if (parsedParams.password === 'badpassword') {
          res.status = 401
          res.json = () => ({
            'token': jwt.sign({item1: 'here is item 1'},
                              'MyJWTSecret',
                              {expiresIn: 1}),
            'url': '#failure'
          })

          return Promise.reject(Object.assign({}, res))
        }

        return Promise.resolve(Object.assign({}, {}))
      })
    })

    afterEach(() => {
      global.fetch.restore()
    })

    it('should login-view cancel', () => {
      const cancelBtn = loginView.find('#cancel')

      loginView.find('#cancel').simulate('click')
      const count = cancelBtn.length

      expect(count).to.equal(1)
      expect(loginView.find('#submit').text()).to.equal('Submit')
    })

    it('should login-view submit', (done) => {

      loginView.find('#userName').simulate('change',
        {
          target: {
                  id: 'userName',
                  value: 'password'
          }
        })
      loginView.find('#exampleInputPassword1').simulate('change',
        {
          target: {
                  id: 'exampleInputPassword1',
                  value: 'password'
          }
        })
      loginView.find('#login-view').simulate('submit')
      // const count = submitBtn.length

      expect(loginView.find('#submit').text()).to.equal('Logging in...')

      done()
    })

    it('should login-view submit', (done) => {

      loginView.find('#userName').simulate('change',
        {
          target: {
                  id: 'userName',
                  value: 'password'
          }
        })
      loginView.find('#exampleInputPassword1').simulate('change',
        {
          target: {
                  id: 'exampleInputPassword1',
                  value: 'badpassword'
          }
        })
      loginView.find('#login-view').simulate('submit')
      // const count = submitBtn.length

      expect(loginView.find('#submit').text()).to.equal('Logging in...')

      done()
    })
  })

  describe('isLoggingIn is false', () => {
    before(() => {
      loginView = mount(
        <Provider store={store}>
          <LoginView initLogin={handleInitLogin}
                     cancelLogin={handleCancelLogin}/>
        </Provider>
      )
    })

    after(() => {
      store.dispatch(initialize())
      loginView.unmount()
    })

    beforeEach(() => {
      // sinon.stub(global, 'fetch').callsFake((apiCall, params) => {
      //   console.log('sinon stub 2', {apiCall: apiCall, params: params})
      //   const parsedParams = JSON.parse(params.body)
      //   const res = {json: () => parsedParams}

      //   if (parsedParams.password === 'password') {
      //     res.status = 200
      //     res.json({
      //       'token': jwt.sign({item1: 'here is item 1'}, 'MyJWTSecret', {expiresIn: 120}),
      //       'url': '/success'
      //     })

      //     return Promise.resolve(Object.assign({}, res))
      //   }
      // })
    })

    afterEach(() => {
      // global.fetch.restore()
    })

    it('should render login-view', () => {
      const submitBtn = loginView.find('#submit')
      const count = submitBtn.length

      expect(count).to.equal(1)
      expect(submitBtn.text()).to.equal('Submit')
    })
  })
})
/* eslint-enable max-statements */