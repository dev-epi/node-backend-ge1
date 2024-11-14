const mongoose = require('mongoose')

const schema = mongoose.Schema({
    firstName : String,
    lastName : {type : String , default : "_"},
    email : {type : String , required : true , unique : true},
    birthdate : Date,
    address : {
        streetName : String,
        postalCode : Number
    },
    image : String,
    files : [{
        path : String,
        size : Number,
        name : String
    }]
})


module.exports = mongoose.model('User' ,schema)
