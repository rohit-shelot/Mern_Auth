const jwt = require('jsonwebtoken')
const verifyToken = async(req,res,next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.json("Token is not existed.")
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SEC_Key);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = verifyToken;