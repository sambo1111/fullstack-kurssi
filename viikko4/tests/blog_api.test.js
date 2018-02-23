const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

describe('Get request', () => {

    beforeAll(async () => {
        await helper.initDb()
    })

    test('gets the first element right', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].author).toEqual('Edsger W. Dijkstra')
    })

    test('returns all elements', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(3)
    })

})

describe('Post request', () => {

    beforeAll(async () => {
        User.remove({})
        const newUser = {
            username: 'matti',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }
        await api.post('/api/users').send(newUser)
    })

    beforeEach(async () => {
        await Blog.remove({})
    })

    test('creates a new blog from given data if data is correct', async () => {

        const body = {
            username:'matti',
            password:'salainen'
        }

        user = await api.post('/api/login').send(body)

        const blog = {
            title: 'Internet Protocol',
            author: 'Some smart guy',
            url: 'http://www.ip.com',
            likes: 11
        }

        const blogsBefore = await helper.blogsInDb()

        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${user.body.token}`)
            .send(blog)
            .expect(200)
        
        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length+1)
        expect(blogsAfter).toContainEqual(blog)
    })

    test('creates a new blog and sets likes to 0 if likes not given', async () => {

        const body = {
            username:'matti',
            password:'salainen'
        }

        user = await api.post('/api/login').send(body)

        const blog = {
            title: 'Stuff',
            author: 'Some guy',
            url: 'http://www.stuff.com'
        }

        const blogsBefore = await helper.blogsInDb()

        await api.post('/api/blogs')
            .send(blog)
            .set('Authorization', `Bearer ${user.body.token}`)
            .expect(200)
        
        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length+1)
        expect(blogsAfter.map(b => b.title)).toContainEqual(blog.title)
        
    })

    test('doesnt create a new blog if title and url missing', async () => {

        const body = {
            username:'matti',
            password:'salainen'
        }

        user = await api.post('/api/login').send(body)

        const blog = {
            author: 'Nope',
            likes: 10
        }

        const blogsBefore = helper.blogsInDb()

        await api.post('/api/blogs')
            .send(blog)
            .set('Authorization', `Bearer ${user.body.token}`)
            .expect(400)
        
        const blogsAfter = helper.blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length)
    })

    test('doesnt create a new blog if title is missing', async () => {

        const body = {
            username:'matti',
            password:'salainen'
        }

        user = await api.post('/api/login').send(body)

        const blog = {
            author: 'Nope',
            likes: 10,
            url: 'www.nope.com'
        }

        const blogsBefore = helper.blogsInDb()

        await api.post('/api/blogs')
            .send(blog)
            .set('Authorization', `Bearer ${user.body.token}`)
            .expect(400)

        const blogsAfter = helper.blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length)
    })
})

describe('Delete request', async () => {

    beforeAll(async () => {
        User.remove({})
        Blog.remove({})
        const newUser = {
            username: 'matti',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }
        await api.post('/api/users').send(newUser)
    })

    test('removes a quest with matching id', async () => {
        const body = {
            username:'matti',
            password:'salainen'
        }

        user = await api.post('/api/login').send(body)

        const newBlog = {
            title: 'DELETE THIS',
            author: 'NOTHING',
            url: 'http://www.nothing.com',
            likes: 10
        }
        const addedBlog = await api.post('/api/blogs')
                            .send(newBlog)
                            .set("Authorization", `Bearer ${user.body.token}`)

        const blogsBefore = await helper.blogsInDb()

        await api
            .delete(`/api/blogs/${addedBlog.body._id}`)
            .set('Authorization', `Bearer ${user.body.token}`)
            .expect(200)
        
        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length-1)
    })
})

describe('when there is initially one user at db', async () => {
    beforeEach(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })
    

    test('POST /api/users succeeds with a fresh username', async () => {
        const usersBeforeOperation = await helper.usersInDb()
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await helper.usersInDb()
        console.log(usersAfterOperation)
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
        const usernames = usersAfterOperation.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users doesnt succeed with a existing username', async () => {
        const usersBeforeOperation = await helper.usersInDb()
        const newUser = {
            username: 'root',
            name: 'NOT TO BE ADDED',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(500)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await helper.usersInDb()
        console.log(usersAfterOperation)
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
        const usernames = usersAfterOperation.map(u => u.name)
        expect(usernames).not.toContain(newUser.username)
    })

    test('POST /api/users doesnt succeed with a too short password', async () => {
        const usersBeforeOperation = await helper.usersInDb()
        const newUser = {
            username: 'root',
            name: 'NOT TO BE ADDED',
            password: 'sa'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(500)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await helper.usersInDb()
        console.log(usersAfterOperation)
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
        const usernames = usersAfterOperation.map(u => u.name)
        expect(usernames).not.toContain(newUser.username)
    })
})

afterAll(() => {
    server.close
})