const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const authRouter = require('./auth/authRouter')
const usersRouter = require('./users/usersRouter')
const valuesRouter = require('./values/valuesRouter')

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/user', usersRouter)
server.use('/api/value', valuesRouter)

server.get('/', (req, res) => {
    res.json({message: 'Its working!'})
})

module.exports = server;