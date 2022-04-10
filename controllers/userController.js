const ApiError = require('../errors/ApiError')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {User} = require("../models/models");


const generateJWT = (id, email) => {
    return jwt.sign({id, email}, process.env.SECRET_KEY|| 'itransition', {
        expiresIn: '1h'
    })
}

class UserController {
    async registration(req, res, next) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(
                {errors: errors.array(),}
            )
        }
        const {email, password} = req.body

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('User with this email already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, last_login: new Date()})
        const token = generateJWT(user.id, user.email)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('user does not exist'))
        }
        if (user.is_banned) {
            return next(ApiError.forbidden('user_banned'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            return next(ApiError.badRequest('the entered password is incorrect'))
        }
        await User.update({last_login: new Date()}, {where: {id: user.id}})
        const token = generateJWT(user.id, user.email)

        res.json({token})


    }

    async check(req, res) {
        const token = generateJWT(req.user.id, req.user.email)
        res.json({token})
    }

    async deleteUser(req, res) {
        const {ids} = req.body
        try {
            for (const id of ids) {
                await User.destroy({where: {id}})
            }
        } catch (e) {
        }

        res.json('Ok')
    }

    async banUser(req, res) {
        const {ids} = req.body
        try {
            for (const id of ids) {
                await User.update({is_banned: true}, {where: {id}})
            }
        } catch (e) {
        }

        res.json('Ok')
    }

    async unBanUser(req, res) {
        const {ids} = req.body
        try {
            for (const id of ids) {
                await User.update({is_banned: false}, {where: {id}})
            }
        } catch (e) {
        }

        res.json('Ok')
    }

    async getAllUsers(req, res) {
        const users = await User.findAll({
            attributes: ['id', 'email', 'createdAt', 'last_login', 'is_banned']
        })
        res.json({users})
    }
}

module.exports = new UserController()