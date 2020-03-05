const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const port = 4444;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
    console.log('We are live on port 4444');
});


app.get('/', (req, res) => {
    res.send('Welcome to my api');
})

app.post('/api/v1', (req, res) => {
    var data = req.body;

    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: "alghom.portfolio@gmail.com",
            pass: "Abdou1996"
        }
    });

    var mailOptions = {
        from: "alghom.portfolio@gmail.com",
        to: 'ghomari.professionnel@gmail.com',
        subject: 'MAIL FROM YOUR PORTFOLIO',
        html: `<p>${data.fname}</p>
          <p>${data.lname}</p>
          <p>${data.email}</p>
          <p>${data.company}</p>
          <p>${data.message}</p>`
    };

    smtpTransport.sendMail(mailOptions,
        (error, response) => {
            if (error) {
                res.send(error)
            } else {
                res.send('Success')
            }
            smtpTransport.close();
        });
})