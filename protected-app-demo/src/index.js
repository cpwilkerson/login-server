require('babel-polyfill')
import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

var app = express()

app.use((req, res, next) => {
  console.log(`${Math.floor(Date.now() / 1000)} - LOG - ${req.path}`) // eslint-disable-line
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
      'url': 'http://localhost/login',
      error
    })
  }
  next()
})

app.use(express.static('public'))

console.log('Listening on port 3001') // eslint-disable-line
app.listen(3001)