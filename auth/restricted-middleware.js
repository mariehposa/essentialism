const jwt = require('jsonwebtoken');

function restricted (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(
            token,
            process.env.SECRET || 'testing test' ,
            (error, decodedToken) => {
                if (error) {
                    res.status(401).json({
                        message: 'Unauthorized User: ' + error.message
                    })
                } else {
                    req.decodedToken = decodedToken
                    next()
                }
            }
        )
    } else {
        res.status(401).json({
            message: 'No credentials provided!'
        })
    }
}

module.exports = restricted;