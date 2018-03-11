const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

const formatUser = (user) => {
    return {
        id: user._id,
        name: user.name,
        username: user.username,
        adult: user.adul,
        blogs: user.blogs
    }
}

usersRouter.post('/', async (request, response) => {
    try {

        const body = request.body
        const existingUsernames = await User.find({})
        if (body.password.length < 3 ||
            existingUsernames.map(u => u.username).includes(body.username)) {
            return response.status(500).json({ error: "password is too short or username already exists" })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            adult: body.adult ? body.adult : false
        })

        const savedUser = await user.save()
        response.json(savedUser)

    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong' })
    }
})

usersRouter.get('/', (request, response) => {
    console.log('jejej')

    User.find({}).populate('blogs', {_id:0, __v:0}).then(users =>
    response.json(users.map(u => formatUser(u))))
    
})

module.exports = usersRouter