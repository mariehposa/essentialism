const db = require('../database/dbConfig');

function getProjectId(user_id, project_id) {
    let query = db('projects as p')
        .where('p.user_id', user_id)

    if (project_id) {
        query.where('p.id', project_id)
    }

    return query.first()
}

function getUserProjects(user_id) {
    return db('projects as p')
        .where('p.user_id', user_id)
}

function addProject(data) {
    return db('projects as p')
        .insert(data, 'p.id')
    .where(([id]) => this.getProjectId(id))
}

function updateProject(project_id, data) {
    return db('projects as p')
        .where('p.id', project_id)
        .update(data)
    // .where(([user_id, id]) => this.getProjectId(user_id, id))
}

function removeProject(user_id, project_id) {
    return db('projects as p')
        .where('p.user_id', user_id)
        .where('p.id', project_id)
        .del()
}

function userId(id) {
    return db('users as u')
        .where('u.id', id)
        .first()
}

function projectId(id) {
    return db('projects as p')
        .where('p.id', id)
        .first()
}

module.exports = {
    getProjectId,
    getUserProjects,
    addProject,
    updateProject,
    removeProject,
    userId,
    projectId
}