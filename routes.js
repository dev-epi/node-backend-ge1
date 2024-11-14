
const { itemList, listByCategory, createItem, updateItem, removeItem, getItemByName } = require('./controllers/items.controller')
const userController = require('./controllers/users.controller')

module.exports=(server)=>{
    server.get('/list' , itemList)
    server.get('/list/:categ' ,listByCategory)
    server.get('/item/:name' , getItemByName)
    server.post('/create_item' , createItem)
    server.put('/update_item/:id' , updateItem)
    server.delete('/remove_item/:id' , removeItem)

    server.get('/users' , userController.getAll)
    server.post('/users' , userController.createUser)
    server.put('/users/:id' , userController.updateUser)
}



