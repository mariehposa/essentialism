const express = require('express');
const db = require('./valuesModel')
const router = express.Router()
const restricted = require('../auth/restricted-middleware')

router.get('/', restricted, (req, res) => {
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

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.getValuesId(id)
    .then(value => {
        res.status(200).json(value)
    })
    .catch(error => {
        res.status(500).json({
            message: `Couldn't fetch value ${error.message}`
        })
    })
})

router.post('/:id/top', restricted, (req, res) => {
    const user_id = req.params.id
    const value_id = req.body.value_id

    db.addTopThree({user_id, value_id})
    .then(flag => {
        if(flag) {
            res.status(200).json({message: `Added value to top three`})
        }
    })
    .catch(err => res.status(500).json({message: `Failed to add value to top three: ${err.message}`, data: err, params: {user_id, value_id}}))
})

router.get('/:id/top', restricted, (req, res) => {
    const user_id = req.params.id

    db.getTopThree({ user_id })
    .then(top3 => {
        res.status(200).json(top3)
    })
    .catch(err => res.status(500).json({message: `Failed: ${err.message}`}))
})

module.exports = router;