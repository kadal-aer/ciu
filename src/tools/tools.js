const logger = require('morgan')
const express = require('express')
const axios = require('axios')
const caliph = require("caliph-api");

const app = express()
app.set('json spaces', 4)
app.use(logger('dev'))

const error_message = {
    status: 500,
    creator: 'RynXD',
    message: 'Internal Server Error'
};

app.get('/ip2website', async (req, res) => {
    const { ip } = req.query
	if (!ip) {
    res.send({
        status: 400,
		creator: 'AntiDev',
		message: `ip is required`
		});
		}
	if (ip) {
    axios.get(`https://webresolver.nl/api.php?key=C24VD-5YH3C-G3G48-EILO5&json&action=ip2websites&string=${ip}`).then(({data}) => {
    return res.send({
		creator: 'AntiDev',
		response: data
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})



app.get('/subfinder', async (req, res) => {
    const { domain } = req.query
	if (!domain) {
    res.send({
        status: 400,
		creator: 'AntiDev',
		message: `domain is required`
		});
		}
	if (domain) {
    caliph.tools.subfinder(domain).then( data => {
    return res.send({
		creator: 'AntiDev',
		response: data
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

app.get('/whois', async (req, res) => {
    const { domain } = req.query
	if (!domain) {
    res.send({
        status: 400,
		creator: 'AntiDev',
		message: `domain is required`
		});
		}
	if (domain) {
    axios.get(`https://api.botcahx.eu.org/api/webzone/whois?query=${domain}&apikey=afYO6dXO`).then(({data}) => {
    return res.send({
		creator: 'AntiDev',
		response: data.result
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

app.get('/geoip', async (req, res) => {
    const { ip } = req.query
	if (!ip) {
    res.send({
        status: 400,
		creator: 'AntiDev',
		message: `ip is required`
		});
		}
	if (ip) {
    axios.get(`https://webresolver.nl/api.php?key=C24VD-5YH3C-G3G48-EILO5&json&action=geoip&string=${ip}`).then(({data}) => {
    return res.send({
		creator: 'AntiDev',
		response: data
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

module.exports = app
