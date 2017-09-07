/* eslint-disable no-console */
/* eslint-disable no-process-env */

require('babel-polyfill')
require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

var app = express()

app.use((req, res, next) => {
  console.log(`${Math.floor(Date.now() / 1000)} - LOG - ${req.path}`)
  next()
})

app.use(bodyParser.json())

app.post('/authorize', (req, res, next) => {
  console.log('Authorize check', req.body)
  try {
    var verified = jwt.verify(req.body.token, 'MyJWTSecret')

    console.log('verified', verified)

    res.json({
      'authorized': true,
      'token': req.body.token,
      'userName': verified.userName
    })
  } catch (error) {
    console.log('authorize error',
                {
                  name: error.name,
                  message: error.message
                })

    res.json({
      'authorized': false,
      'token': '',
      'url': `${process.env.APP_URI}/login`,
      error
    })
  }
  next()
})

app.use(express.static('public'))

console.log('App-Server listening on port 3001')
app.listen(3001)

/* eslint-enable no-console */
/* eslint-enable no-process-env */