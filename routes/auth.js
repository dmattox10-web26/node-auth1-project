const bcrypt = require('bcrypt')
const router = require('express').Router()

const Users = require('../models/users')

router.post('/register', (req, res) => {
  let user = req.body

  const hash = bcrypt.hashSync(user.password, 8)

  user.password = hash

  Users.add(user)
    .then(saved => {
      req.session.loggedIn = true;
      req.session.username = user.username
      res.status(201).json(saved)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.post('/login', (req, res) => {
  let { username, password } = req.body

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        req.session.username = user.username
        res.status(200).json({ message: `Welcome ${user.username}!` })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.post('/logout', (req, res) => {

})

module.exports = router
