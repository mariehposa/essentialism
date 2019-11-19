const express = require('express');
const db = require('./usersModel')
const router = express.Router()
const restricted = require('../auth/restricted-middleware')

router.get('/:id/projects/:project_id', restricted, validateUserId, validateProjectId, (req, res) => {
    db.getProjectId(req.valUser.id, req.valProject.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({
            message: `Couldn't fetch project ${error.message}`
        })
    })
})

router.get('/:id/projects', restricted, validateUserId, (req, res) => {
    db.getUserProjects(req.valUser.id)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        res.status(500).json({
            message: `Couldn't fetch projects ${error.message}`
        })
    })
})

router.post('/:id/projects', restricted, validateUserId, validateBody, (req, res) => {
    const newData = req.body;
    newData.user_id = req.valUser.id

    db.addProject(newData)
    .then(data => {
        res.status(201).json(data)
    })
    .catch (error => {
        res.status(500).json({ message: 'Failed to create new project' + error.message });
    });
})

router.put('/:id/projects/:project_id', restricted, validateUserId, validateProjectId, validateBody, (req, res) => {
    const editData = req.body;
    editData.user_id = req.valUser.id;

    db.updateProject(req.valProject.id, editData)
    .then(project => {
        res.status(201).json(project)
    })
    .catch (error => {
        res.status(500).json({ message: 'Failed to update project' + error.message });
    });
})

router.delete('/:id/projects/:project_id', restricted, validateUserId, validateProjectId, (req, res) => {
    db.removeProject(req.valUser.id, req.valProject.id)
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
    const { project_id } = req.params;

    db.projectId(project_id)
    .then(project => {
        if(project) {
            req.valProject = project
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
            req.valUser = user
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