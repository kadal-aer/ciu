const logger = require('morgan')
const express = require('express')
const axios = require('axios')
const caliph = require("caliph-api");

const app = express()
app.set('json spaces', 4)
app.use(logger('dev'))