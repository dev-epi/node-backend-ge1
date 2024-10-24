const express = require('express')
const { items } = require('./data')
const { itemList } = require('./controllers/items.controller')


const server = express()
//activer format JSON des les apis
server.use(express.json())


var list = items
server.get('/' , (req , res)=>{
    res.send('Hello !')   
})

server.get('/list' , itemList)

server.get('/list/:categ' , (req , res)=>{
    var data = list.filter(ele => ele.category.toLowerCase() == req.params.categ.toLowerCase())
    res.send(data)
})




server.get('/item/:name' , (req , res)=>{
    var data = list.find(ele => ele.name.toLowerCase() == req.params.name.toLowerCase())
    if(data){
        res.send(data)
    }else{
        res.status(406).send('item not found')
    }
    
})


server.post('/create_item' , (req , res)=>{
    console.log('body : ',req.body)
    // var name = req.body.name
    // var category = req.body.category
    var {name , category} = req.body
    list.push(req.body)
    res.end()
})


server.put('/update_item/:id' , (req,res)=>{
    let itemIndex = list.findIndex(ele=> ele._id == req.params.id)
    if(itemIndex == -1){
        res.status(404).send('item not found')
    }else{
        list[itemIndex] = {...list[itemIndex] , ...req.body}

        res.json({message : "updated"})
    }

})


server.delete('/remove_item/:id' , (req,res)=>{
    let itemIndex = list.findIndex(ele=> ele._id == req.params.id)
    if(itemIndex == -1){
        res.status(404).send('item not found')
    }else{
       list.splice(itemIndex , 1)

        res.json({message : "deleted"})
    }

})








server.listen(3000 ,()=>{
    console.log('Server connected on port 3000')
} )