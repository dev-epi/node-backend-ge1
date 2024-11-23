exports.testMiddleware = (req , res , next)=>{

   
    
    req.ch = 'Bonjour'
    next()
}