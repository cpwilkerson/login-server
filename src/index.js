require('babel-polyfill')
import express from 'express'

var app = express()

app.get('/', express.static('public'))

// app.get('/', function (req, res) {
//   res.send('hello world')
// })

console.log('Listening on port 3000')
app.listen(3000)