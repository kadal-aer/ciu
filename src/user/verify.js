const express = require('express')
const axios = require('axios')
const requestIP = require('request-ip');
const waktu = new Date((new Date).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"  
    }));
const app = express()
app.set('json spaces', 4)

async function getData() {
const result = await axios.get('https://api.rynxd.link/api/get-data?apikey=kontol')
    return result.data
}

async function getUserByCode(res, code) {
    const data = await getData()
    const userCode = []
    for (const key in data.users) {
        if (data.users[key].code === code) {
            userCode.push(key)
        }
    }
    if (userCode.length < 1) {
        return res.json({
        status:404,
        response: 'No user found'
        })
    }
    return userCode
}

async function preData(data) {
const dtb = { data :{ users: {} } }
dtb.data.users[data[0]] = {
register: true,
limit: 100,
//ip: ipUser
}
return dtb
}

async function sendData() {
const db = await preData()
const response = await fetch('https://api.rynxd.link/api/update-data?apikey=kontol', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(db.data)
        })
}

app.get('/', (req, res) => {
    const ipUser = requestIP.getClientIp(req);
    const code = req.query.code
    res.json({
    status: 'success',
    ip: ipUser,
    code: code,
    waktu: waktu
    })
})

module.exports = app