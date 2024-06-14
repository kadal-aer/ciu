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


const useragent = require("express-useragent");
const geoip = require("geoip-lite");
const uap = require("ua-parser-js");

app.use(useragent.express());

app.set("trust proxy", true);

app.get("/user", (req, res) => {
  const ip = req.ip;
  const geo = geoip.lookup(ip);
  const country = geo ? geo.country : "Unknown";
  const isMobile = req.useragent.isMobile;
  const ua = uap(req.headers["user-agent"]);
  res.json({ ip, country, isMobile, userAgent: ua });
});


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log('App running on port', PORT)
})
