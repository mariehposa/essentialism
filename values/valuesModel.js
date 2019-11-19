const db = require('../database/dbConfig')

function getValues () {
    return db('values')
}

function getValuesId (id) {
    return db('values as v')
    .where('v.id', id)
}

module.exports = {
    getValues,
    getValuesId
}