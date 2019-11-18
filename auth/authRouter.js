const express = require('express')
const bcrypt = require('bcrypt')
const db = require('./authModel')
const router = express.Router()

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash;

    db.addUser(user)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(error => {
        res.status(500).json({
            message: 'Couldnt register user' + error.message
        })
    })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    db.getUserBy({ username })
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({
                token: token
            })
        } else {
            res.status(401).json({
                message: 'Invalid credentials'
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Internal server error!' + error.message
        })
    })
})

function generateToken (user) {
    const payload = {
        subject: user.id,
        username: user.username,
        email: user.email
    }
    const options = {
        expiresIn: '1 day'
    }
    const result = jwt.sign(
        payload, 
        process.env.SECRET,
        options
    )
    return result;
}

module.exports = router;