const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    last_login: {type: DataTypes.DATE, defaultValue: null, allowNull: true},
    is_banned: {type: DataTypes.BOOLEAN, defaultValue: false},
})


module.exports = {
    User
}