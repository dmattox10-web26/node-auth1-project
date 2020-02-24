const bcrypt = require('bcryptjs')

const Users = require('../models/users')

module.exports = (req, res, next) => {
    if (req.headers.username && req.headers.password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(req.headers.password, user.password)) {
                    next()
                }
                else {
                    res.status(401).json({ message: 'invalid credentials' })
                }
            })
            .catch(({ name, message, stack }) => {
                res.status(500).json({ name, message, stack })
            })
    }
    else {
        res.status(400).json({ message: 'missing credentials' })
    }
}