
const { itemList, listByCategory, createItem, updateItem, removeItem, getItemByName } = require('./controllers/items.controller')
const userController = require('./controllers/users.controller')
const expController = require('./controllers/experiences.controller')
const {  testMiddleware } = require('./middlewares/middlewares')

const multiparty = require('connect-multiparty')
const uploadMiddleware = multiparty({uploadDir : './images'})
module.exports=(server)=>{
    server.get('/list' , itemList)
    server.get('/list/:categ' ,listByCategory)
    server.get('/item/:name' , getItemByName)
    server.post('/create_item' , createItem)
    server.put('/update_item/:id' , updateItem)
    server.delete('/remove_item/:id' , removeItem)

    server.get('/users',testMiddleware , userController.getAll)
    server.post('/users' , uploadMiddleware , userController.createUser)
    server.put('/users/:id' , userController.updateUser)
    server.delete('/users/:id' , userController.deleteUser)

    server.get('/exps' , expController.getAll)
    server.post('/exps' , expController.createExperience)
    server.put('/exps/:id' , expController.updateExperience)
    server.delete('/exps/:id' , expController.deleteExperience)
}   



