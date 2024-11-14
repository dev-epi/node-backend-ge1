const { items } = require("../data")

var list = items
const itemList = (req , res)=>{
    res.send(list)
}
const listByCategory =  (req , res)=>{
    var data = list.filter(ele => ele.category.toLowerCase() == req.params.categ.toLowerCase())
    res.send(data)
}
const getItemByName = (req , res)=>{
    var data = list.find(ele => ele.name.toLowerCase() == req.params.name.toLowerCase())
    if(data){
        res.send(data)
    }else{
        res.status(406).send('item not found')
    }
    
}
const createItem =(req , res)=>{
    console.log('body : ',req.body)
    // var name = req.body.name
    // var category = req.body.category
    var {name , category} = req.body
    list.push(req.body)
    res.end()
}

const updateItem =(req,res)=>{
    let itemIndex = list.findIndex(ele=> ele._id == req.params.id)
    if(itemIndex == -1){
        res.status(404).send('item not found')
    }else{
        list[itemIndex] = {...list[itemIndex] , ...req.body}

        res.json({message : "updated"})
    }

}

const removeItem = (req,res)=>{
    let itemIndex = list.findIndex(ele=> ele._id == req.params.id)
    if(itemIndex == -1){
        res.status(404).send('item not found')
    }else{
       list.splice(itemIndex , 1)

        res.json({message : "deleted"})
    }

}

module.exports = {itemList , listByCategory , getItemByName , createItem , updateItem , removeItem}