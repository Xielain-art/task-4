const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization
        if (!token) {
            res.status(401).json({message: 'user is not authorized'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: 'user is not authorized'})
    }
}