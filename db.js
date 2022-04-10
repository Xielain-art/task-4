const {Sequelize} = require('sequelize')

if (process.env.NODE_ENV === 'development') {
    module.exports = new Sequelize(
        process.env.DB_NAME || 'task_4',
        process.env.DB_USER || 'postgres',
        process.env.DB_PASSWORD || '123',
        {
            dialect: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || '5432',
        }
    )
}
if (process.env.NODE_ENV === 'production') {
    module.exports = new Sequelize(
        process.env.DATABASE_URL,{
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
    )
}