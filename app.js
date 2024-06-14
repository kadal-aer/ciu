const os = require('os')
const bytes = require('bytes')
const logger = require('morgan')
const express = require('express')
const axios = require('axios')
const caliph = require("caliph-api");
const path = require('path')
const speech = require('./src/speech.js')
const route = require('./src/route.js')

const app = express()
app.set('json spaces', 4)
app.use(logger('dev'))

const error_message = {
    status: 500,
    creator: 'RynXD',
    message: 'Internal Server Error'
};

const htmlPath = path.resolve(__dirname, 'public');
app.use(express.static(htmlPath));


app.use('/speech', speech)
app.use('/api', route)
app.get('/bot', (req, res) => {
  res.redirect('https://wa.me/62858103573999?text=.menu')
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log('App running on port', PORT)
})
