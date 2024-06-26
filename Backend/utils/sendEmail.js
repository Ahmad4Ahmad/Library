const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, sendTo, sentFrom, replyTo) => 
{
    const transporter = nodemailer.createTransport(
    {
        host: process.env.EMAIL_HOST,
        port: 587,
        auth:
        {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: 
        {
            rejectUnauthorized: false
        }
    });

    const options = 
    {
        from: sentFrom,
        to: sendTo,
        reply: replyTo,
        subject: subject,
        html: message
    };

    transporter.sendMail(options, function (err, info)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(info);
        }
    });
};

module.exports = sendEmail;