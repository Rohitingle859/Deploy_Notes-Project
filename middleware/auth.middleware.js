const jwt = require("jsonwebtoken")


const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if (token){
        try {
            const decoded = jwt.verify(token,"masai")
            if (decoded){
                //console.log(decoded)
                req.body.userID = decoded.userID
                req.body.username = decoded.user
                next()
            } else{
                res.json({msg:"You are not authorized!"})
            }
        } catch (error) {
            res.json({error})
            
        }
    }else{
        res.json({msg:"Please Login...!"})
    }
}

module.exports = {
    auth
}