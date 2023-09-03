const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

    const transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'userauthms@gmail.com',
            pass: process.env.APP_PASSWORD,
        }
    });

    const mailOptions = {
        from: 'userauthms@gmail.com',
        to: options.to,
        subject: options.subject,
        html: options.html,
    };

    transport.sendMail(mailOptions, (err, info) => {
        if(info){
            console.log(info);
        }
        else{
            console.log(err);
        }
    });

};

module.exports = sendEmail;