const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    }
}));

const makeANiceEmail = text => `
    <div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family:sans-serif;
        line-height: 2;
        font-size: 20px;
    ">
        <h2>Hello There!</h2>
        <p>${text}</p>
    </div>
`;

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;