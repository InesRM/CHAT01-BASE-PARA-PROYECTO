const {decodeToken} = require("../utils/jwt");
function userAuthenticated(req, res, next) {
    const {authorization} = req.headers;
    if(!authorization)return res.status(401).send({error:"You must be logged in."});
    const token = authorization.replace("Bearer ","");
   const userData= decodeToken(token);
   try{
    const {exp}=userData;
    const currentTieme = Date.now()/1000;
    if(currentTieme>exp){
        return res.status(401).send({error:"El token ha expirado."});
    }
    next();
   }

    catch(error){
        return res.status(401).send({error:"El token es invalido."});
    }
   
}
module.exports=userAuthenticated;