"use-strict"

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail(to, subject, body){
    try{

        const msg = {
            to,
            from: process.env.SENDGRID_FROM,
            subject,
            text: body,
            html: `
                <div>
                    <h1>${subject}</h1>
                    <p>${body}</p>
                </div>
            `
        }

        await sgMail.send(msg);

    }catch(e){
        console.log(e);
    }
}

module.exports = sendMail;