const UserModel = require("../models/User.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const { transporter } = require("./config")
exports.register = async (req, res) => {

    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            res.status(422).send({ message: 'Email exist' })
        }else{
            //generer clé privé avec puissance entre 10 et 20
            let privateKey = await bcrypt.genSalt(12)
            let hashedPassword = await bcrypt.hash(req.body.password , privateKey)
            let newUser = new UserModel(req.body)
            newUser.password = hashedPassword
            await newUser.save()
            res.send(newUser)
        }
    } catch (err) {
        res.status(404).send(err)
    }
}
exports.register2 = (req, res) => {

    UserModel.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(422).send({ message: 'Email exist' })
            }
        }).catch(err => res.status(404).send(err))

}
exports.login = async(req,res)=>{
    try{
        let {email , password} = req.body
        if(email && password){
            let user = await UserModel.findOne({email : email})
            
            if(user && await bcrypt.compare(password , user.password)){
                let token = jwt.sign({_id : user._id , role : 'test'} , process.env.SECRET )

                res.send({firstName : user.firstName , token : token})
            }else{
                res.status(403).send({message : 'Invalid credentials'})
            }
        }else{
            res.status(444).send({message : 'Missing fields'})
        }
    }catch(err){
        console.log(err)
        res.status(444).send(err)
    }
}
exports.forgotPassword = async(req, res)=>{
    let {email} = req.body
    if(email){
        try{
            let user = await UserModel.findOne({email : email})
            if(user){
                   user.resetKey = uuid.v7() 
                   console.log(user.resetKey)
                   let mailContent = {
                    from : 'NODE APP',
                    to :user.email,
                    subject : 'RESET PASSWORD',
                    text :'reset code  : '+user.resetKey,
                    html : `<h2> Reset link </h2>
                        <a href="http://localhost:4000/reset/${user.resetKey}"> Click here </a>
                    `
                   }
                   await transporter.sendMail(mailContent)
                   await user.save()
                   res.send({message : 'Mail sent successfully'})


            }else{
                res.status(403).send({message : 'Invalid credentials'})
            }
        }catch(err){ res.status(444).send(err)}
    }else{
        res.status(444).send({message : 'Missing fields'}) 
    }

}

exports.resetPassword = async(req, res)=>{
    const {resetKey  , newPassword} = req.body
    if(resetKey && newPassword){
        try{
            let user = await UserModel.findOne({resetKey : resetKey})
            if(user){
                let privateKey = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(newPassword , privateKey)
                await user.save()
                res.send({message : 'password updated !'})

            }else{
                res.status(403).send({message : 'Invalid credentials'})
            }
        }catch(err){ res.status(444).send(err)}
    }else{
        res.status(444).send({message : 'Missing fields'}) 
    }
}