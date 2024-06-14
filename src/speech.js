const logger = require('morgan')
const express = require('express')
const path = require('path')
const app = express()

app.use(logger('dev'))
const htmlPath = path.resolve(__dirname, 'speech');
app.use(express.static(htmlPath))

module.exports = app