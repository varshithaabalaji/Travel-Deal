var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 3000;
app.get('/', function (req, res) {
    // res.send(`<link rel="stylesheet" href="/css/style.css"></link>
    // index`)
    res.render('index');
});
app.post('/send-email', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'travelho1304@gmail.com',
            pass: 'Mustang_007'
        }
    });
    let mailOptions = {
        from: req.body.email, // sender address
        to: 'travelho1304@gmail.com', // list of receivers
        subject: `Support needed: ${req.body.subject}`, // Subject line
        text: req.body.message, // plain text body
        html: `<b>FROM: ${req.body.email}<br>MESSAGE:${req.body.message}</b>` // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    });
});
app.listen(port, function () {
    console.log('Server is running at port: ', port);
});