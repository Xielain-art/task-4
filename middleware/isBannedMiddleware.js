const {User} = require("../models/models");
const ApiError = require("../errors/ApiError");
module.exports = async function (req, res, next) {
    try {
        const {email} = req.user
        const user = await User.findOne({where: {email}})
        if (user.is_banned) {
            return next(ApiError.forbidden('user banned'))
        }
    } catch (e) {
        return next(e)
    }
    next()
}