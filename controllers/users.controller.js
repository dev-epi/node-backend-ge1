const UserModel = require("../models/User.model")

exports.getAll = async (req, res) => {
    let list = await UserModel.find()
    res.send(list)
}

exports.createUser = async (req, res) => {

    try {
        let user = new UserModel(req.body)
        
        await user.save()
        res.send(user)
    }catch(err){
        res.status(422).send(err)
    }
}

exports.updateUser = (req,res)=>{

    UserModel.updateOne({_id : req.params.id} , req.body)
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.status(422).send(err)

    })
}

