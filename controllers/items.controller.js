const { items } = require("../data")

var list = items
const itemList = (req , res)=>{
    res.send(list)
}




module.exports = {itemList}