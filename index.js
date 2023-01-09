require("dotenv").config()

const { sendMail } = require('./sendMail')
const express = require('express')

const { check_auth } = require("./authentication_handler")


const app = express()

app.use(express.json())
app.get("/", async (req,res)=>res.send("Not a route"))
app.post('/api/v1/mail', async ( req , res ) => { 
    if(!check_auth(req.headers)){
        return res.status(403).json({
            success: false,
            data: "Invalid permissions to access this API. Please contact dev@andrewbloese.me if you think this may be a mistake."
        })
    }
    const { from , to , subject, text , html  } = req.body;
    const {success, message} = await sendMail(from, typeof to === "string" ? [to] : to,subject,text,html);
    if(success){
        res.status(200).json(message)
    } else {
        res.status(500).json(message)
    }

})

app.listen(process.env.PORT || 8080 , () => console.log(`Mailer running on ${process.env.PORT || 8080}`))


