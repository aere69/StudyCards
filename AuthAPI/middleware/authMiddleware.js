const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if(!token)
        return res.status(401).json({ error: 'Access Denied' });

    try{
        if(!process.env.KEY){
            return res.status(500).json({ error: 'Missing KEY'})
        }

        const decoded = jwt.verify( token, process.env.KEY );

        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid Token'})
    }
};

module.exports = verifyToken;