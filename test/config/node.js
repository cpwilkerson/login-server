/* eslint-disable no-unused-vars */
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import supertest from 'supertest'
import sinonChai from 'sinon-chai'

chai.use(chaiAsPromised)
chai.use(sinonChai)

global.sinon = sinon
global.chai = chai
global.supertest = supertest
global.assert = chai.assert
global.expect = chai.expect
global.should = chai.should()