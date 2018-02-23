const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  try {
    return response.json(await Blog.find({}).populate('user', { username: 1, name: 1, adult: 1 }))
  } catch (exception) {
    return response.status(500).end()
  }
})

const getTokenFrom = (request) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  console.log(request.body)
  try {

    const token = getTokenFrom(request)
    const decodedToken = jwt.decode(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).send({ error: 'no token' })
    }

    if (request.body === undefined) {
      return response.status(400).json({ error: 'body missing' })
    }

    if (request.body.title === undefined || request.body.url === undefined) {
      return response.status(400).json({ error: 'bad request' })
    }

    //const user = User.findById(body.userId)
    const user = await User.findById(decodedToken.id)

    const likes = (request.body.likes) ? request.body.likes : 0

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    console.log(savedBlog)
    response.json(savedBlog)

    user.blogs = user.blogs.concat(savedBlog._id)
    console.log(user)
    await user.save()

  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }

})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body
    const blog = {
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)

  } catch (error) {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {

    const token = getTokenFrom(request)
    decodedToken = jwt.decode(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).send({ error: 'no token' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== user.id.toString()) {

      return response.status(500).send({ error: 'cant delete this blog' })
    }

    await Blog.findByIdAndRemove(request.params.id)

    user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
    await user.save()

    response.status(200).end()
  } catch (error) {
    console.log(error)
    response.status(400).json({ error: 'something went wrong...' })
  }
})

module.exports = blogsRouter