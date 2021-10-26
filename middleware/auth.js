const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        // const token = req.headers.authorization.split(' ')[1];

        // console.log(req.cookies.access_token, 'хуй');

        const token = req.cookies.access_token;

        if(!token) return res.status(401).json({ error: 'Unauthorized' });

        const decoded = jwt.verify(token, process.env.SECRET);

        req.user = decoded;
        
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Unauthorized' });
    }
}