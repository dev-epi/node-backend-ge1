const nodemailer = require('nodemailer')

exports.transporter = nodemailer.createTransport({
    service : process.env.MAIL_SERVICE,
    auth : {
        user :process.env.MAIL_USER,
        pass : process.env.MAIL_PASS
    }
})