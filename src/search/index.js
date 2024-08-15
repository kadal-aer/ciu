const logger = require('morgan')
const express = require('express')
const axios = require('axios')
const caliph = require("caliph-api");
let yts = require ('yt-search');
const { spotifySearch, tiktokSearch } = require('../model/scrape.js')
const app = express()
app.set('json spaces', 4)
app.use(logger('dev'))
const error_message = {
    status: 500,
    creator: 'AntiDEV',
    message: 'Internal Server Error'
};
app.get('/pinterest', async (req, res) => {
    const { query } = req.query
	if (!query) {
    res.send({
        status: 400,
		creator: 'AntiDEV',
		message: `query is required`
		});
		}
	if (query) {
    caliph.search.pin(query).then( a => {
    return res.send({
		creator: 'AntiDEV',
		response: a
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

app.get('/tiktok', async (req, res) => {
    const { query } = req.query
	if (!query) {
    res.send({
        status: 400,
		creator: 'AntiDEV',
		message: `query is required`
		});
		}
	if (query) {
    tiktokSearch(query).then( a => {
    return res.send({
		creator: 'AntiDEV',
		response: a
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

app.get('/youtube', async (req, res) => {
    const { query } = req.query
	if (!query) {
    res.send({
        status: 400,
		creator: 'AntiDEV',
		message: `query is required`
		});
		}
	if (query) {
    yts(query).then( a => {
    return res.send({
		creator: 'AntiDEV',
		response: a.all
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

app.get('/spotify', async (req, res) => {
    const { query } = req.query
	if (!query) {
    res.send({
        status: 400,
		creator: 'AntiDEV',
		message: `query is required`
		});
		}
	if (query) {
    spotifySearch(query).then( a => {
    return res.send({
		creator: 'AntiDEV',
		response: a.data
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

module.exports = app