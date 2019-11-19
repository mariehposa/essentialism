const express = require('express');
const db = require('./usersModel')
const router = express.Router()
const restricted = require('../auth/restricted-middleware')

router.get('/:user_id/projects/:project_id', (req, res) => {
    const { user_id, project_id } = req.params;
    db.getProjectId(user_id, project_id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({
            message: `Couldn't fetch project ${error.message}`
        })
    })
})

router.get('/:id/projects', (req, res) => {
    const { id } = req.params

    db.getUserProjects(id)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        res.status(500).json({
            message: `Couldn't fetch projects ${error.message}`
        })
    })
})

router.post('/:id/projects', (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    newData.user_id = id

    db.addProject(newData)
    .then(data => {
        res.status(201).json(data)
    })
    .catch (error => {
        res.status(500).json({ message: 'Failed to create new project' + error.message });
    });
})

router.put('/:id/projects/:project_id', (req, res) => {
    const {id, project_id} = req.params;
    const editData = req.body;
    editData.user_id = id;

    db.updateProject(project_id, editData)
    .then(project => {
        res.status(201).json(project)
    })
    .catch (error => {
        res.status(500).json({ message: 'Failed to update project' + error.message });
    });
})

router.delete('/:id/projects/:project_id', (req, res) => {
    const { id, project_id } = req.params;

    db.removeProject(id, project_id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({
            message: `An error occured! ${error.message}`
        })
    })
})

module.exports = router