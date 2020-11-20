const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config/db')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if(token) {
        jwt.verify(token, config.secret, (err, decodedToken) => {
            if(err) {
                console.log(err.message)
                res.redirect('/login')
            } else {
                next()
             }
        })
    } else {
        res.redirect('/login')
    }

}



module.exports = { requireAuth }