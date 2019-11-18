const express = require('express');
const db = require('./projectsModel')
const router = express.Router()
const restricted = require('../auth/restricted-middleware')

router.get('/', restricted, (req, res) => {
    db.getProject()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({
            message: `Couldn't fetch projects ${error.message}`
        })
    })
})

module.exports = router