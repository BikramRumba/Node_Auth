const jwt = require('jsonwebtoken');

// creating middlewares

module.exports =function (req, res, next){
    // if user has a token we checking

    const token = req.header('auth-token');
    // if user doesnot have a token
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    } catch(err) {
        res.status(400).send('Invalid TOken');
    }

}

