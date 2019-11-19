const express = require('express');
const db = require('./usersModel')
const router = express.Router()
const restricted = require('../auth/restricted-middleware')

router.get('/:id/projects/:project_id', validateUserId, validateProjectId, (req, res) => {
    db.getProjectId(req.params.id, req.params.project_id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({
            message: `Couldn't fetch project ${error.message}`
        })
    })
})

router.get('/:id/projects', validateUserId, (req, res) => {
    db.getUserProjects(req.params.id)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        res.status(500).json({
            message: `Couldn't fetch projects ${error.message}`
        })
    })
})

router.post('/:id/projects', validateUserId, validateBody, (req, res) => {
    const newData = req.body;
    newData.user_id = req.params.id

    db.addProject(newData)
    .then(data => {
        res.status(201).json(data)
    })
    .catch (error => {
        res.status(500).json({ message: 'Failed to create new project' + error.message });
    });
})

router.put('/:id/projects/:project_id', validateUserId, validateProjectId, validateBody, (req, res) => {
    const editData = req.body;
    editData.user_id = req.user.id;

    db.updateProject(req.project.id, editData)
    .then(project => {
        res.status(201).json(project)
    })
    .catch (error => {
        res.status(500).json({ message: 'Failed to update project' + error.message });
    });
})

router.delete('/:id/projects/:project_id', validateUserId, validateProjectId, (req, res) => {
    db.removeProject(req.user.id, req.project.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({
            message: `An error occured! ${error.message}`
        })
    })
})

function validateProjectId (req, res, next) {
    const { id } = req.params;

    db.projectId(id)
    .then(project => {
        if(project) {
            req.project = project
            next()
        } else {
            res.status(400).json({
                message: 'Invalid project id'
            })
        }
    })
    .catch(error => {
        res.status(404).json({
            message: "id not found" + error.message
        })
    })
}

function validateUserId (req, res, next) {
    const { id } = req.params;

    db.userId(id)
    .then(user => {
        if(user) {
            req.user = user
            next()
        } else {
            res.status(400).json({
                message: 'Invalid user id'
            })
        }
    })
    .catch(error => {
        res.status(404).json({
            message: "id not found" + error.message
        })
    })
}

function validateBody (req, res, next) {
    if(Object.keys(req.body).length) {
        if(req.body.project_name) {
            next()
        } else {
            res.status(400).json({
                message: "missing required field"
            })
        }
    } else {
        res.status(400).json({
            message: "missing required data"
        })
    }
}

module.exports = router