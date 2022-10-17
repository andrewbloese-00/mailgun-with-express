const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_PRIVATE_KEY});



exports.sendMail = async function ( from , to , subject, text="" , html="" ) { 
        const message = { 
            from: `${from} alerts@blazenotification.com`,
            to: to, 
            subject: subject,
            text: text, 
            html: html,
        }


        try {
            const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, message)
            return { success: true, message: msg}
        } catch (err) {
            return { success: false, message: err.message}
        }
}