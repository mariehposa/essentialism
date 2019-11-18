const express = require('express');
const db = require('./valuesModel')
const router = express.Router()

router.get('/', (req, res) => {
    db.getValues()
    .then(values => {
        res.status(200).json(values)
    })
    .catch(error => {
        res.status(500).json({
            message: `Couldn't fetch values ${error.message}`
        })
    })
})

module.exports = router;