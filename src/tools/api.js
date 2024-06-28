const nodemailer = require('nodemailer');

const teksEmail = (name, number, code) => {
return (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body, html {
            height: 100%;
            margin: 0;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            background-color: #f4f4f4;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .profile-pic {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            border: 3px solid #333;
            object-fit: cover;
        }
        h1 {
            font-size: 20px;
            color: #333;
            margin: 10px 0;
        }
        p {
            color: #555;
            margin-bottom: 20px;
        }
        a.button {
            display: inline-block;
            text-decoration: none;
            background-color: #25D366;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        a.button:hover {
            background-color: #128C7E;
        }
    </style>
</head>
<body align=center>
    <div class="container" align=center>
        <h1>Hai ${name}</h1>
        <p>Your registration code is ${code}</p>
        <a href="wa.me/${number}?text=${code}" class="button">Redirect to WhatsApp</a>
    </div>
</body>
</html>
`)
}

const sendEmail = (res, name, number, code, email) => {
  const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'team.antidev@gmail.com',
    pass: 'ythg bieo fsqm mezi'
  }
});
  // Mengatur opsi email
  const mailOptions = {
    from: 'team.antidev@gmail.com',
    to: email,
    subject: 'Verification Code',
    html: teksEmail(name, number, code) //html
  };

  // Mengirim email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.json({
        status: 500,
		creator: 'AntiDev',
		message: error
		});
    } else {
      console.log('Email sent: ' + info.response);
      return res.json({
        status: 200,
		creator: 'RynXD',
		message: `email sent`
		});
    }
  });
}

module.exports = { sendEmail }
