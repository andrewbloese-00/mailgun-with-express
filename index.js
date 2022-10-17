require("dotenv").config()
const port = process.env.PORT || 8080;

const { sendMail } = require("./sendMail")
const express = require('express')

const app = express();
app.use(express.json())

app.post("/api/v1/mail/html", async ( req , res ) => { 
    const { from , to , subject, text , html  } = req.body;
    const mailSent = await sendMail(from,[to],subject,text,html);
    if(mailSent.success){
        res.status(200).json(mailSent)
    } else {
        res.status(500).json(mailSent)
    }

})

app.listen(port, ()=>console.log(`Mailer listening on port ${port}`))
