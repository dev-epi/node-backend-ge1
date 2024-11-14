const express = require('express')
const mongoose = require('mongoose')

const server = express()
//activer format JSON des les apis
server.use(express.json())

mongoose.connect('mongodb://localhost:27017/myproject_db')
.then(()=>console.log('Mongodb connected'))
.catch((err)=>console.log('Error' , err))

require('./routes')(server)

server.get('/' , (req , res)=>{
    res.send('Hello !')   
})

server.listen(3000 ,()=>{
    console.log('Server connected on port 3000')
} )