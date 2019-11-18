require('dotenv').config()
const server = require('./server');
const port = process.env.port

server.listen(port, () => {
    console.log(`===Server is listening on port ${port}===`)
})