const express = require('express')
const app = express()
const { sendEmail } = require('./api.js')
app.set('json spaces', 4)

app.get('/send', async (req, res) => {
    const { name, number, code, email } = req.query
    const respons = await sendEmail(res, name, number, code, email )
})

module.exports = app
