import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Users from './components/Users'
import userService from './services/users'
import BlogList from './components/BlogList'
import User from './components/User'
import { connect } from 'react-redux'
import { notify } from './reducers/notificationReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      notification: null,
      users: []
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    userService.getAll().then(usersFromDb =>
      this.setState({ users: usersFromDb })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  like = (id) => async () => {
    const liked = this.state.blogs.find(b => b._id === id)
    const updated = { ...liked, likes: liked.likes + 1 }
    await blogService.update(id, updated)
    this.props.notify(`you liked '${updated.title}' by ${updated.author}`, 5)
    this.setState({
      blogs: this.state.blogs.map(b => b._id === id ? updated : b)
    })
  }

  remove = (id) => async () => {
    const deleted = this.state.blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if (ok === false) {
      return
    }

    await blogService.remove(id)
    this.props.notify(`blog '${deleted.title}' by ${deleted.author} removed`, 5)
    this.setState({
      blogs: this.state.blogs.filter(b => b._id !== id)
    })
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    const result = await blogService.create(blog)
    this.props.notify(`blog '${blog.title}' by ${blog.author} added`, 5)
    this.setState({
      title: '',
      url: '',
      author: '',
      blogs: this.state.blogs.concat(result)
    })
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.props.notify('logged out', 5)
    this.setState({ user: null })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.props.notify('welcome back!', 5)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.notify('käyttäjätunnus tai salasana virheellinen', 'error')
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  navBar = () => {
    const navBarStyle = {
      border: 'solid',
      borderWidth: 'thin',
      padding: 5,
      borderRadius: 7,
      borderColor: '#070B19',
      backgroundColor: '#E0F8F7',
      marginTop: 5
    }


    return (
      <div>
        <Notification store={this.props.store} />
        {this.state.user.username} logged in <button onClick={this.logout}>logout</button>
        <div style={navBarStyle}>
          <NavLink exact to="/users"> users </NavLink>
          <NavLink exact to="/blogs"> blogs </NavLink>
        </div>
      </div>
    )
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification notification={this.state.notification} />
          <h2>Kirjaudu sovellukseen</h2>
          <form onSubmit={this.login}>
            <div>
              käyttäjätunnus
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginChange}
              />
            </div>
            <div>
              salasana
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    }

    const pageStyle = {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 5
    }
    return (
      <div style={pageStyle}>

        <Router>
          <div>
            {this.navBar()}
            <Route exact path="/users" render={() => <Users users={this.state.users} />} />
            <Route exact path="/blogs" render={() => <BlogList
              title={this.state.title}
              author={this.state.author}
              url={this.state.url}
              handleSubmit={this.addBlog}
              handleChange={this.handleLoginChange}
              blogs={this.state.blogs}
              like={this.like}
              remove={this.remove}
              loggedUser={this.state.user} />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={this.state.users.find(u => u.id === match.params.id)} />} />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blog={this.state.blogs.find(b => b._id === match.params.id)}
                like={this.like}
                remove={this.remove}
                user={this.state.user} />} />
          </div>
        </Router>
      </div>
    )
  }
}

export default connect(null, { notify })(App)
