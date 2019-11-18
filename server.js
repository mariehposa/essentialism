const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    res.json({message: 'Its working!'})
})

module.exports = server;