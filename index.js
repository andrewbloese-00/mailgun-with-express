require("dotenv").config()

const { sendMail } = require('./sendMail')
const express = require('express')
const app = express()

app.use(express.json())
app.post('/api/v1/mail', async ( req , res ) => { 
    const { from , to , subject, text , html  } = req.body;
    const mailSent = await sendMail(from,[to],subject,text,html);
    if(mailSent.success){
        res.status(200).json(mailSent)
    } else {
        res.status(500).json(mailSent)
    }

})

app.listen(process.env.PORT || 8080 , () => console.log(`Mailer running on ${process.env.PORT || 8080}`))
