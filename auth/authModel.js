const db = require('../database/dbConfig');

function getUserBy(userValue) {
    return db('users as u')
    .where(userValue)
    // .select('id', 'username', 'email')
    .first()
}

function getUserId(id) {
    return db('users as u')
    .where('u.id', id)
    .select('username', 'email')
    .first()
}

function addUser(user) {
    return db('users as u')
    .insert(user)
    .then(([id]) => this.getUserId(id))
}

module.exports = {
    getUserBy,
    getUserId,
    addUser
}