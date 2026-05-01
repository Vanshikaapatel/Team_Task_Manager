const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token = req.headers.authorization;

    if(!token){
        return res.send("Invalid token");
    }

    try{
        let decoded = jwt.verify(token, "secret");
        req.userId = decoded.id;
        next();
    }catch(err){
        res.send("Invalid token");
    }
};