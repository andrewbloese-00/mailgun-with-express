require("dotenv").config()
const express = require('express')
const cors = require('cors')

const { sendMail } = require('./sendMail')
const check_auth = ( headers ) => { 
    const authorization = headers.authorization || headers.Authorization
    if(!authorization) return false;
    const token = authorization.split(" ")[1]

    //ideally you would use a better system of authentication but for examples sake this will do
    if(token === process.env.ADMIN_TOKEN ){
        return true;
    }

    return false


}

const app = express()

app.use(express.json())
app.use(cors());

//this api does not have any html page responses it simply performs the mail action
app.get("/", async (req,res)=>res.send("Not a route"))

/* Expects from, to , subject, text, and html fields to be present, otherwise req will fail */
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


