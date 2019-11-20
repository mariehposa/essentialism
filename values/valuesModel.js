const db = require('../database/dbConfig')

function getValues () {
    return db('values')
}

function getValuesId (id) {
    return db('values as v')
    .where('v.id', id)
}

function addTopThree(top3){
    return db('top_three')
    .insert(top3, 'id')
}

function getTopThree(){
    return db('top_three')
    .limit(3)
    .orderBy('created_at', 'desc')
}

module.exports = {
    getValues,
    getValuesId,
    addTopThree,
    getTopThree,
}