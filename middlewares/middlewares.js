const jwt = require('jsonwebtoken')
exports.testMiddleware = (req , res , next)=>{

    req.ch = 'Bonjour'
    next()
}

exports.verifyToken = (req, res, next)=>{
    let token = req.headers['authorization'] || req.body.token || req.headers['access']
    if(!token){
        res.status(403).send({message : 'token required'})
    }
    if(req.headers['authorization']){
        token = token.replace(/^Bearer\s+/, "");
    }
    try{
        let decoded = jwt.verify(token , process.env.SECRET)
        req.user = decoded
        return next()
       
    }catch(err){
        return res.status(401).send({message : 'Unauthorized'})
    }
   
}