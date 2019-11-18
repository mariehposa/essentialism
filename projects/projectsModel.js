const db = require('../database/dbConfig');

function getProject() {
    return db('project as p')
}

function getProjectId(id) {
    return db('project as p')
    .where('p.id', id)
    .first()
}

function addProject(data) {
    return('project as p')
    .insert(data)
    .where(([id]) => this.getProjectId(id))
}

module.exports = {
    getProject,
    getProjectId,
    addProject
}