const jwt = require('jsonwebtoken');
const { create } = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;

function createAccessToken(user) {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 5);
    return jwt.sign(_tokenPayload(user, expiration), JWT_SECRET);

}

function _tokenPayload(user, expiration, tokenType='token'){
    return {
        tokenType,
        user, 
        iat: new Date().getTime(),
        exp: expiration.getTime()
    }
}
    function decodeToken(token){
        return jwt.decode(token, JWT_SECRET);
    }

function createRefreshToken(user){
    const expiration = new Date();
    expiration.setMonth(expiration.getMonth() + 1);
    return jwt.sign(_tokenPayload(user, expiration, 'refresh'), JWT_SECRET);
}


module.exports = {  
    createAccessToken,
    createRefreshToken,
    decodeToken
}

