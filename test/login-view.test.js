import React from 'react' //eslint-disable-line
import LoginView from '../src/login-view' //eslint-disable-line
import {mount} from 'enzyme'

const expect = global.expect

describe('login-view testing', () => {
  var loginView //eslint-disable-line

  before(() => {
    loginView = mount(<LoginView />)
  })

  after(() => {
    loginView.unmount()
  })

  it('should render login-view', () => {
    const count = loginView.find('.btn-toolbar').length

    expect(count).to.equal(1)
  })
})