// var sendgrid  = require('sendgrid')('jrauschenberg', 'quokka123');

//   var payload = {
//     to      : 'john.rauschenberg@gmail.com',
//     from    : 'from@other.com',
//     subject : 'Saying Hi',
//     text    : 'This is my first email through SendGrid, bitch.'
//   };

//   sendgrid.send(payload, function(err, json) {
//     console.log('made it');
//     if (err) { console.error(err); }
//     console.log('result:', json);
//   });

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://john.rauschenberg@gmail.com:whiskeyweewee@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
    to: 'john.rauschenberg@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello bitches 🐴', // plaintext body
    html: '<b>Hello bitches 🐴</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});