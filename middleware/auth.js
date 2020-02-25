//const bcrypt = require('bcrypt')

//const Users = require('../models/users')

module.exports = (req, res, next) => {
    /*
    let { username, password } = req.headers;

    if (username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
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
    */
   if (req.session && req.session.loggedIn) {
        next()
   }
   else {
       res.status(401).json({ you: 'shall not pass!' })
   }
}