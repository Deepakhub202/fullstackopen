const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  const ok = user && await bcrypt.compare(req.body.password, user.passwordHash)

  if (!ok) return res.status(401).end()

  const token = jwt.sign({ id: user._id }, process.env.SECRET)
  res.json({ token, username: user.username })
})

module.exports = loginRouter
