const mongoose = require('mongoose')
const SkillModel = require('./Skill.model')

const schema = mongoose.Schema({
    firstName : String,
    lastName : {type : String , default : "_"},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    birthdate : Date,
    address : {
        streetName : String,
        postalCode : Number
    },
    image : String,
    attestations : [{
        path : String,
        size : Number,
        name : String
    }],
    skills : [{type : mongoose.Types.ObjectId , ref : SkillModel}],
    resetKey : String
})


module.exports = mongoose.model('User' ,schema)
