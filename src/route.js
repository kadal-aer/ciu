const os = require('os')
const bytes = require('bytes')
const logger = require('morgan')
const express = require('express')
const axios = require('axios')
const caliph = require("caliph-api");
const path = require('path')
const tools = require('./tools/tools.js')
const chara = require('./chara/chara.js')
const app = express()
app.set('json spaces', 4)
app.use(logger('dev'))

app.use('/tools', tools)
app.use('/chara', chara)
app.get('/', (req, res) => {
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
		path: '/api/tools/ip2website',
		query: [ 'IP' ]
		},
		{
		name: 'Subdomain Finder',
		path: '/api/tools/subfinder',
		query: [ 'domain' ]
		},
		{
		name: 'Whois Domain',
		path: '/api/tools/whois',
		query: [ 'domain' ]
		},
		]
		}
		]
	})
})

function formatSize(num) {
	return bytes(+num, { unitSeparator: ' ' })
}

module.exports = app