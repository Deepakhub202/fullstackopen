const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const decoded = jwt.verify(req.token, process.env.SECRET)
  const user = await User.findById(decoded.id)

  if (!req.body.title || !req.body.url) {
    return res.status(400).end()
  }

  const blog = new Blog({
    ...req.body,
    likes: req.body.likes || 0,
    user: user._id
  })

  const saved = await blog.save()
  user.blogs = user.blogs.concat(saved._id)
  await user.save()

  res.status(201).json(saved)
})

blogsRouter.delete('/:id', async (req, res) => {
  const decoded = jwt.verify(req.token, process.env.SECRET)
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== decoded.id) {
    return res.status(401).end()
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes: req.body.likes },
    { new: true }
  )
  res.json(updated)
})

module.exports = blogsRouter
