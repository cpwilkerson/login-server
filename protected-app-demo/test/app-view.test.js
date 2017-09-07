/* eslint-disable max-statements */
import React from 'react'
import {default as AppView} from '../src/app-view'
import appReducer from '../src/app-reducers'
import {initialize} from '../src/app-actions'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
// import fetch from 'isomorphic-fetch'
require('isomorphic-fetch')
import jwt from 'jsonwebtoken'

import {mount} from 'enzyme'

const expect = global.expect
const sinon = global.sinon
const store = createStore(appReducer, applyMiddleware(thunk))

// expires 2027-09-05
// const jwtRecord = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkdhbmRhbGYiLCJpYXQiOjE1MDQ2NjIxMDAsImV4cCI6MTUwNDY2MjE2MH0.vl2Fv74qPuXdSN0ay5k-mWiOsrckfwejEBTsdyG8mc0'


describe('app-view testing', () => {
  var appView //eslint-disable-line

  before(() => {
    sinon.stub(global, 'fetch').callsFake((apiCall, params) => {
      var res = {}

      res.status = 200
      res.json = () => ({
        'token': jwt.sign({userName: 'Gandalf'},
                          'MyJWTSecret',
                          {expiresIn: 60}),
        'url': '#success'
      })

      return Promise.resolve(Object.assign({}, res))
    })
  })

  after(() => {
    global.fetch.restore()
  })

  describe('AppView testing', () => {

    before(() => {
      appView = mount(
        <Provider store={store}>
          <AppView />
        </Provider>
      )
    })

    after(() => {
      store.dispatch(initialize())
      appView.unmount()
    })

    it('should render app-view', () => {
      expect(appView.find('#app-view').length).to.equal(1)
    })
  })
})
/* eslint-enable max-statements */