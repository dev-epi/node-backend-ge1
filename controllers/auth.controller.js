const UserModel = require("../models/User.model")
const bcrypt = require('bcryptjs')
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