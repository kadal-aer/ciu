const os = require('os')
const bytes = require('bytes')
const logger = require('morgan')
const express = require('express')
const axios = require('axios')
const caliph = require("caliph-api");
const path = require('path')

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

app.get('/api/chara/chat', async (req, res) => {
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
    })
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error_message);
    });
})

app.get('/api/chara/info', async (req, res) => {
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

app.get('/api/chara/search', async (req, res) => {
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
		result: 'No character found'
    })
    }
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

app.get('/api/ip2website', async (req, res) => {
    const { ip } = req.query
	if (!ip) {
    res.send({
        status: 400,
		creator: 'RynXD',
		message: `ip is required`
		});
		}
	if (ip) {
    axios.get(`https://webresolver.nl/api.php?key=C24VD-5YH3C-G3G48-EILO5&json&action=ip2websites&string=${ip}`).then(({data}) => {
    return res.send({
		creator: 'RynXD',
		result: data
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

app.get('/api/subfinder', async (req, res) => {
    const { domain } = req.query
	if (!domain) {
    res.send({
        status: 400,
		creator: 'RynXD',
		message: `domain is required`
		});
		}
	if (domain) {
    caliph.tools.subfinder(domain).then( data => {
    return res.send({
		creator: 'RynXD',
		result: data
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})

app.get('/api/whois', async (req, res) => {
    const { domain } = req.query
	if (!domain) {
    res.send({
        status: 400,
		creator: 'RynXD',
		message: `domain is required`
		});
		}
	if (domain) {
    axios.get(`https://api.botcahx.eu.org/api/webzone/whois?query=${domain}&apikey=afYO6dXO`).then(({data}) => {
    return res.send({
		creator: 'RynXD',
		result: data.result
		});
    }).catch((error) => {
      console.log(error);
      res.json(error_message);
    });
    }
})


app.get('/api', (req, res) => {
const obj = {}
	const used = process.memoryUsage()
	for (let key in used) obj[key] = formatSize(used[key])
	
	const totalmem = os.totalmem()
	const freemem = os.freemem()
	obj.memoryUsage = `${formatSize(totalmem - freemem)} / ${formatSize(totalmem)}`
	
	res.json({
		success: true,
		creator: 'RynXD',
		uptime: new Date(process.uptime() * 1000).toUTCString().split(' ')[4],
		status: obj,
		endpoint: [
		{
		name: 'Docs',
		path: '/api'
		},
		{
		name: 'Speech To Text',
		path: '/speech'
		},
		{
		name: 'Character AI',
		paths: [
		{
		name: 'Search Character',
		path: '/api/chara/search',
		query: [ 'name' ]
		},
		{
		name: 'Character Info',
		path: '/api/chara/info',
		query: [ 'charaterId' ]
		},
		{
		name: 'Chat with Character AI',
		path: '/api/chara/chat',
		query: [ 'characterId', 'text', 'sessionId' ]
		}
		]
		},
		{
		name: 'Tools',
		paths: [
		{
		name: 'IP to Website',
		path: '/api/ip2website',
		query: [ 'IP' ]
		},
		{
		name: 'Subdomain Finder',
		path: '/api/subfinder',
		query: [ 'domain' ]
		},
		{
		name: 'Whois Domain',
		path: '/api/whois',
		query: [ 'domain' ]
		},
		]
		}
		]
	})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log('App running on port', PORT)
})

function formatSize(num) {
	return bytes(+num, { unitSeparator: ' ' })
}
