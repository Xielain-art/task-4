const Router = require('express')
const {check} = require('express-validator')
const userController = require('../controllers/userController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const isBannedMiddleware = require('../middleware/isBannedMiddleware')

router.post('/registration',
    check('email').isEmail().withMessage('invalid email'),
    check('password').isLength({min: 1}).withMessage('minimum password length 1 character'),
    userController.registration)
router.post('/login',
    check('email').isEmail().withMessage('invalid email'),
    check('password').isLength({min: 1}).withMessage('minimum password length 1 character'),
    userController.login)
router.get('/auth', authMiddleware, isBannedMiddleware, userController.check)
router.get('/users', authMiddleware, isBannedMiddleware, userController.getAllUsers)
router.post('/delete/', authMiddleware, isBannedMiddleware, userController.deleteUser)
router.post('/ban/', authMiddleware, isBannedMiddleware, userController.banUser)
router.post('/unban/', authMiddleware, isBannedMiddleware, userController.unBanUser)

module.exports = router