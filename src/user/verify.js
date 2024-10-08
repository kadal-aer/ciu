const express = require('express')
const axios = require('axios')
const requestIP = require('request-ip');
const waktu = new Date((new Date).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"  
    }));
const app = express()
app.set('json spaces', 4)
const fetch = require('node-fetch')

const error_message = {
    status: 500,
    creator: 'AntiDEV',
    message: 'Internal Server Error'
};
async function getData() {
const result = await axios.get('https://api-antidev.run.place/user/get-data')
    return result.data
}

async function getUserByCode(res, code) {
    const data = await getData()
    const userWithCode = []
    for (const key in data.users) {
        /*if (!data.users[key].code) {
            res.json({
            status: 404,
            response: 'No user found'
        })
        }*/
        if (data.users[key].code === code) {
            userWithCode.push(key)
        }
    }
    /*if (userWithCode.length < 1) {
        res.json({
        status: 404,
        response: 'No user found'
        })
    }*/
    return userWithCode
}

async function preData(userWithCode, ipUser) {
const dtb = { data :{ users: {} } }
dtb.data.users[userWithCode[0]] = {
register: true,
limit: 100,
ip: ipUser
}
return dtb
}

async function sendData(res, data, code) {
const response = await fetch('https://api-antidev.run.place/user/update-data', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.data)
        })
        if (response.ok) {
        res.json({
        status: 'success',
        code: code,
        response: 'Anda telah terverifikasi, mohon gunakan bot dengan bijak'
        })
        } else {
        console.log(e);
        res.json(error_message);
        }
}

app.get('/verify', async (req, res) => {
    const ipUser = requestIP.getClientIp(req);
    const code = req.query.code
    if (!code) {
    return res.json({
        status: 400,
        response: 'code is required!'
        })
    }
    if (code) {
    try {
    const userWithCode = await getUserByCode(res, code)
    const data = await preData(userWithCode, ipUser)
    sendData(res, data, code)
    } catch(e) {
    console.log(e);
    res.json(error_message);
    }
    }
    
})

module.exports = app
