const os = require('os')
const bytes = require('bytes')
const logger = require('morgan')
const express = require('express')
const axios = require('axios')

const app = express()
app.set('json spaces', 4)
app.use(logger('dev'))

app.all('/', (req, res) => {
	const obj = {}
	const used = process.memoryUsage()
	for (let key in used) obj[key] = formatSize(used[key])
	
	const totalmem = os.totalmem()
	const freemem = os.freemem()
	obj.memoryUsage = `${formatSize(totalmem - freemem)} / ${formatSize(totalmem)}`
	
	res.json({
		success: true,
		message: 'Hello World!',
		uptime: new Date(process.uptime() * 1000).toUTCString().split(' ')[4],
		status: obj
	})
})

app.get('/api', async (req, res) => {
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
		result: data.result
    }
    )
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error_message);
    });
})

app.get('/chara/info', async (req, res) => {
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
		result: data.result
		});
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error_message);
    })
})

app.get('/chara/search', async (req, res) => {
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
    return res.send({
        status: 200,
		creator: 'RynXD',
		result: data.result
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log('App running on port', PORT)
})

function formatSize(num) {
	return bytes(+num, { unitSeparator: ' ' })
}
