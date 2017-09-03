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

app.post('/login', (req, res) => {
  res.json({
    'token': jwt.sign({item1: 'here is item 1'},
                       'MyJWTSecret',
                       {expiresIn: 120}),
    'url': '/success'
  })
})

app.get('/success', (req, res) => {
  res.send('login success')
})

app.use(express.static('public'))

console.log('Listening on port 3000') // eslint-disable-line
app.listen(3000)