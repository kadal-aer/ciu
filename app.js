const os = require('os')
const bytes = require('bytes')
const logger = require('morgan')
const express = require('express')
const axios = require('axios')
const caliph = require("caliph-api");
const path = require('path')
const speech = require('./src/speech.js')
const route = require('./src/route.js')
const user = require('./src/user/verify.js')

const app = express()
app.set('json spaces', 4)
app.use(logger('dev'))
const waktu = new Date((new Date).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"  
    }));
    
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

app.use('/user', user)

const requestIP = require('request-ip');
app.get('/myinfo', (req, res) => {
    const ipAddress = requestIP.getClientIp(req);
    //res.send(ipAddress)
    res.json({
    status: 'success',
    ip: ipAddress,
    waktu: waktu
    })
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log('App running on port', PORT)
})
