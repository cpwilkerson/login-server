process.env.NODE_ENV = 'test' // eslint-disable-line

require('ignore-styles')

// const jsdom = require('jsdom').jsdom

var jsdom = require('jsdom');
const {JSDOM} = jsdom;

const { document } = (new JSDOM('')).window;

global.document = document;

const exposedProperties = ['window', 'navigator', 'document'] //eslint-disable-line

// global.document = jsdom('', {url: 'http://localhost'})
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}