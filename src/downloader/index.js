const logger = require('morgan')
const express = require('express')
const axios = require('axios')
const caliph = require("caliph-api");
const api = require('api-dylux')
const { spotifydl } = require('../model/scrape-dl')
const app = express()
app.set('json spaces', 4)
app.use(logger('dev'))
const error_message = {
    status: 500,
    creator: 'AntiDEV',
    message: 'Internal Server Error'
};
app.get('/tiktok', async (req, res) => {
    const { url } = req.query
	if (!url) {
    res.send({
        status: 400,
		creator: 'AntiDEV',
		message: `url is required`
		});
		}
	if (url) {
    api.tiktok(url).then(data => {
    return res.send({
		creator: 'AntiDEV',
		response: data.result
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

app.get('/igdl', async (req, res) => {
    const { url } = req.query
	if (!url) {
    res.send({
        status: 400,
		creator: 'AntiDEV',
		message: `url is required`
		});
		}
	if (url) {
    api.igdl(url).then(data => {
    return res.send({
		creator: 'AntiDEV',
		response: data.result
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

app.get('/facebook', async (req, res) => {
    const { url } = req.query
	if (!url) {
    res.send({
        status: 400,
		creator: 'AntiDEV',
		message: `url is required`
		});
		}
	if (url) {
    api.fbdl(url).then(data => {
    return res.send({
		creator: 'AntiDEV',
		response: data.result
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

app.get('/spotify', async (req, res) => {
    const { url } = req.query
	if (!url) {
    res.send({
        status: 400,
		creator: 'AntiDEV',
		message: `url is required`
		});
		}
	if (url) {
    spotifydl(url).then(data => {
    console.log(data)
    return res.send({
		creator: 'AntiDEV',
		response: data
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

module.exports = app