require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const path = require('path')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const favicon = require('express-favicon')


const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.join(__dirname, 'client', 'build', 'favicon.ico')))
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        app.listen(PORT, () => {
            console.log('App started on ', PORT)
        })
    } catch (e) {
        console.log(e.message)
    }
}
start()
