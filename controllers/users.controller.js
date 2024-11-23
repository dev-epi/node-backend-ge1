const UserModel = require("../models/User.model")

exports.getAll = async (req, res) => {
    console.log(req.ch)
    let list = await UserModel.find()
    res.send(list)
}

exports.createUser = async (req, res) => {
//npm i connect-multiparty
    console.log(req.files)
    try {
        let user = new UserModel(req.body)
        
        if(req.files && req.files.avatar){
            //nom :Model(image)  = nom :postmane(avatar)
            user.image = req.files.avatar.path
        }
        if(req.files && req.files.attestations){
            //nom dans le model = nom dans le postman
            user.attestations = req.files.attestations
        }
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

exports.deleteUser = (req , res)=>{
    UserModel.deleteOne({_id : req.params.id})
    .then(result=>res.send(result))
    .catch(err=>res.status(422).send(err))
}
