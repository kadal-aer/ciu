const os = require('os')
const bytes = require('bytes')
const logger = require('morgan')
const express = require('express')
const axios = require('axios')
const caliph = require("caliph-api");
const path = require('path')
const tools = require('./tools/tools.js')
const mail = require('./tools/mail.js')
const chara = require('./chara/chara.js')
const media = require('./downloader/index.js')
const search = require('./search/index.js')
const app = express()
const requestIP = require('request-ip');
app.set('json spaces', 4)
app.use(logger('dev'))
const waktu = new Date((new Date).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"  
    }));
    
   
app.use('/tools', tools)
app.use('/mail', mail)
app.use('/chara', chara)
app.use('/media', media)
app.use('/search', search)
app.get('/', (req, res) => {
const obj = {}
	const used = process.memoryUsage()
	for (let key in used) obj[key] = formatSize(used[key])
	
	const totalmem = os.totalmem()
	const freemem = os.freemem()
	obj.memoryUsage = `${formatSize(totalmem - freemem)} / ${formatSize(totalmem)}`
	const ipAddress = requestIP.getClientIp(req);
	res.json({
		success: true,
		creator: 'AntiDev',
		ip: ipAddress,
		uptime: new Date(process.uptime() * 1000).toUTCString().split(' ')[4],
		time: waktu,
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
		{
		name: 'IP Geolocation',
		path: '/api/tools/geoip',
		query: [ 'IP' ]
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
