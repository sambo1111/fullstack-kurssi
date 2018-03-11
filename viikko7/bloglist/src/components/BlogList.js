import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class BlogList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Togglable buttonLabel='uusi blogi'>
          <BlogForm
            handleChange={this.props.handleChange}
            title={this.props.title}
            author={this.props.author}
            url={this.props.url}
            handleSubmit={this.props.handleSubmit}
          />
        </Togglable>

        <h2>Blogs</h2>
        <ListGroup>
          {this.props.blogs.map(blog =>
            <ListGroupItem key={blog._id}><Link to={`/blogs/${blog._id}`}>
              {blog.title}
            </Link>
            </ListGroupItem>
          )}
        </ListGroup>
      </div>
    )
  }
}

export default BlogList