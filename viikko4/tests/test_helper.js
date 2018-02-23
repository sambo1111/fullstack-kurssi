const Blog = require('../models/blog')
const User = require('../models/user')
const axios = require('axios')

const blogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Quick mafs',
        author: 'Albert Einstein',
        url: 'http://www.einsteinboss.com/quickmafs.html',
        likes: 24,
    },
    {
        title: 'How to play guitar',
        author: 'Jimi Hendrix',
        url: 'http://www.hendrix.com',
        likes: 3,
    }
]

const format = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}

const formatUser = (user) => {
    return {
        username: user.username,
        name: user.name,
        adult: user.adult
    }
}

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(formatUser)
}

const initDb = async () => {
    await Blog.remove({})

    let blogObject = new Blog(blogs[0])
    await blogObject.save()

    blogObject = new Blog(blogs[1])
    await blogObject.save()

    blogObject = new Blog(blogs[2])
    await blogObject.save()
}


module.exports = {
    blogs, format, nonExistingId, blogsInDb, initDb, usersInDb
}