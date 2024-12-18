const ExperienceModel = require("../models/Experience.model")


exports.getAll = async (req, res) => {
    console.log('user : ',req.user)
    let list = await ExperienceModel.find({user_id : req.user._id})
    .populate({path : 'user_id' , select:'firstName lastName'})
    res.send(list)
}

exports.createExperience = async (req, res) => {

    try {
        let exp = new ExperienceModel(req.body)
        exp.user_id = req.user._id
        await exp.save()
        res.send(exp)
    }catch(err){
        res.status(422).send(err)
    }
}

exports.updateExperience = (req,res)=>{

    ExperienceModel.updateOne({_id : req.params.id} , req.body)
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.status(422).send(err)

    })
}

exports.deleteExperience = (req , res)=>{
    ExperienceModel.deleteOne({_id : req.params.id})
    .then(result=>res.send(result))
    .catch(err=>res.status(422).send(err))


















}
