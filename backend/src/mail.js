const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transport = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    }
});

const makeANiceEmail = text => `
    <div className="email" 
        style="
            border: 1px solid black;
            padding: 20px;
            font-family: sans-serif;
            line-height: 2px;
            font-size: 20px;
        "
    >
        <h2>Hello</h2>
        <p>${text}</p>
</div>
`;

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;