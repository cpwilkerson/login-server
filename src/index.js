require('babel-polyfill')
import express from 'express'

var app = express()

app.use((req, res, next) => {
  console.log('LOG', req.path) // eslint-disable-line
  next()
})

app.use(express.static('public'))

console.log('Listening on port 3000') // eslint-disable-line
app.listen(3000)