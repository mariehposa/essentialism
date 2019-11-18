const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const usersRouter = require('./users/usersRouter')
const projectsRouter = require('./projects/projectsRouter')
const valuesRouter = require('./values/valuesRouter')

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/user', usersRouter)
server.use('/api/project', projectsRouter)
server.use('/api/value', valuesRouter)

server.get('/', (req, res) => {
    res.json({message: 'Its working!'})
})

module.exports = server;