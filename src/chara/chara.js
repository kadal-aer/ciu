const logger = require('morgan')
const express = require('express')
const axios = require('axios')
const app = express()
app.set('json spaces', 4)
app.use(logger('dev'))

const error_message = {
    status: 500,
    creator: 'RynXD',
    response: 'Internal Server Error'
};

app.get('/chat', async (req, res) => {
    const { text, characterId } = req.query
if (!text) {
    res.send({
        status: 400,
		creator: 'RynXD',
		message: `text is required`
		});
		}
	if (!characterId) {
    res.send({
        status: 400,
		creator: 'RynXD',
		message: `characterId is required`
		});
		}
    const sessionId = req.query.sessionId || ''
    axios.get(`https://andreans-cai.hf.space/api?characterId=${characterId}&sessionId=${sessionId}&text=${text}`).then(({data}) => {
    return res.json({
    status: 200,
		creator: 'RynXD',
		response: data.result
    })
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error_message);
    });
})

app.get('/info', async (req, res) => {
    const { characterId } = req.query
	if (!characterId) {
    res.send({
        status: 400,
		creator: 'RynXD',
		message: `characterId is required`
		});
		}
    axios.get(`https://andreans-cai.hf.space/api/chara/info?characterId=${name}`).then(({data}) => {
    return res.send({
        status: 200,
		creator: 'RynXD',
		response: data.result
		});
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error_message);
    })
})

app.get('/search', async (req, res) => {
    const { name } = req.query
	if (!name) {
    res.send({
        status: 400,
		creator: 'RynXD',
		message: `name is required`
		});
		}
	if (name) {
    axios.get(`https://andreans-cai.hf.space/api/chara/search?name=${name}`).then(({data}) => {
    if (!data.result) {
    return res.json({
    status: 404,
		creator: 'RynXD',
		response: 'No character found'
    })
    }
    return res.send({
        status: 200,
		creator: 'RynXD',
		response: data.result
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

module.exports = app