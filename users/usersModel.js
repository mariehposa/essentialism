const db = require('../database/dbConfig');

function getProjectId(userId, projectId) {
    return db('projects as p')
    .where('p.user_id', userId)
    .where('p.id', projectId)
    .first()
}

function getUserProjects(user_id) {
    return db('projects as p')
    .where('p.user_id', user_id)
}

function addProject(data) {
    return db('projects as p')
    .insert(data)
    // .where(([user_id, id]) => this.getProjectId(user_id, id))
}

function updateProject(projectId, data) {
    return db('projects as p')
    .where('p.id', projectId)
    .update(data)
    // .where(([user_id, id]) => this.getProjectId(user_id, id))
}

function removeProject(projectId) {
    return db('projects as p')
    .where('p.id', projectId)
    .del()
}

module.exports = {
    getProjectId,
    getUserProjects,
    addProject,
    updateProject,
}