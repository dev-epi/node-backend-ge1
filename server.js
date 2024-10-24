const express = require('express')
const { items } = require('./data')


const server = express()


var list = items
server.get('/' , (req , res)=>{
    res.send('Hello !')   
})
server.get('/list' , (req , res)=>{
    res.send(list)
})

server.get('/list/:categ' , (req , res)=>{
    var data = list.filter(ele => ele.category.toLowerCase() == req.params.categ.toLowerCase())
    res.send(data)
})

server.get('/item/:name' , (req , res)=>{
    var data = list.find(ele => ele.name.toLowerCase() == req.params.name.toLowerCase())
    if(data){
        res.send(data)
    }else{
        res.send('item not found')
    }
    
})












server.listen(3000 ,()=>{
    console.log('Server connected on port 3000')
} )