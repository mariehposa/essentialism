const db = require('../database/dbConfig')

function getValues () {
    return db('values')
}

module.exports = {
    getValues
}