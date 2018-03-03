import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogToggle from './components/BlogToggle'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      notification: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs: blogs.sort(function(a,b) {
        return b.likes - a.likes
      })})
    )
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({
        user
      })
      blogService.setToken(user.token)
    }
  }

  handleLoginFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLikeButton = async (id) => {

      let oldBlog = this.state.blogs.find(b => b._id.toString() === id.toString())
      oldBlog.likes = oldBlog.likes + 1

      const updatedBlog = await blogService.update(oldBlog)

      this.setState({
        blogs: this.state.blogs.map(b => b._id !== updatedBlog._id ? b : updatedBlog).sort(function(a,b) {
          return b.likes - a.likes
        })
      })
  }

  handleDeleteBlogButton = async (id) => {
    console.log(id)
    await blogService.remove(id)
    this.setState({
      blogs: this.state.blogs.filter(b => b.id !== id)
    })
  }

  addNewBlogToList = (blog) => {
    //have to do this so that when new blog is added, the user is populated, so concat is not enough
    //because the user wont be populated then
    this.blogForm.toggleVisibility()
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleLogout = () => {
    window.localStorage.clear()
    this.setState({
      user: null, notification: 'You have logged out!'
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({
        username: '', password: '', user, notification: 'You have logged in!'
      })
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        username: '', password: '', notification: 'Wrong username or password!'
      })
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
      console.log(exception)
    }
  }


  render() {

    const newBlogForm = () => (
      <Togglable buttonLabel="create blog" ref={component => this.blogForm = component}>
        <CreateBlogForm addBlogToList={this.addNewBlogToList} />
      </Togglable>
    )

    const blogList = () => (
      <div>
        {this.state.blogs.map(blog =>
          <BlogToggle key={blog._id}
            user={this.state.user}
            blog={blog}
            handleDeleteBlogButton={this.handleDeleteBlogButton}
            handleLikeButton={this.handleLikeButton} />)}
      </div>
    )


    return (
      <div>
        <Notification notification={this.state.notification} />
        {this.state.user === null ?
          <LoginForm state={this.state}
            handleLoginFormChange={this.handleLoginFormChange}
            login={this.login} /> :
          <div>
            <button type="submit" onClick={this.handleLogout}> Logout </button>
            {newBlogForm()}
            {blogList()}
          </div>}
      </div>
    );
  }
}

const LoginForm = ({ state, handleLoginFormChange, login }) => {
  return (
    <div className="login">
      <h2> Log in </h2>

      <form onSubmit={login}>
        <div>
          Username
        <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleLoginFormChange}
          />
        </div>
        <div>
          Password
        <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleLoginFormChange}
          />
        </div>
        <button type="submit"> Log in </button>
      </form>
    </div>
  )
}

export default App;
