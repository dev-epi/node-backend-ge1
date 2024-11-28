const express = require('express')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

const server = express()
//activer format JSON des les apis
server.use(express.json())

mongoose.connect(process.env.DB)
.then(()=>console.log('Mongodb connected'))
.catch((err)=>console.log('Error' , err))

require('./routes')(server)

server.get('/' , (req , res)=>{
    res.send('Hello !')   
})

server.listen(process.env.PORT || 3000 ,()=>{
    console.log('Server connected on port 3000')
} )