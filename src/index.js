require('babel-polyfill')
import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

var app = express()

app.use((req, res, next) => {
  console.log('LOG', req.path) // eslint-disable-line
  next()
})

app.use(bodyParser.json())

app.post('/login-attempt', (req, res) => {
  console.log('login params', req.body)
  if (req.body.password === 'password') {
    res.status = 200
    res.json({
              'token': jwt.sign({userName: req.body.user},
                       'MyJWTSecret',
                       {expiresIn: 60}),
              'url': 'http://localhost'
             })
  } else {
    res.status = 401
    res.json({
      'token': jwt.sign({item1: 'unauthorized'},
               'MyJWTSecret',
               {expiresIn: 0}),
      'url': 'http://localhost/login'
     })
  }
})

app.get('/success', (req, res) => {
  res.send('login success')
})

app.use('/login', express.static('public'))

console.log('Listening on port 3000') // eslint-disable-line
app.listen(3000)