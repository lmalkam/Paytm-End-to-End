const jwt = require('jsonwebtoken')
const jwtPassword = "123456";


const AuthMiddleware = (req,res,next) =>{

    const token = req.headers.authorization;

    console.log(token);

    if(!token)
    {
        return res.status(403).json({msg : "fUnauthorized"});
    }

    try{
        const decoded = jwt.verify(token,jwtPassword);
        req.userid = decoded.name ;
        next();
    }
    catch(err)
    {
        return res.status(403).json({
            msg:"Invalid Token in auth",
        });
    }

};

module.exports = AuthMiddleware;