const express = require('express')

const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')

const configure = require('./middleware/config')

const server = express()

configure(server)

server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)

module.exports = server