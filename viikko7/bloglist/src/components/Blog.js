import React from 'react'
import { Redirect } from 'react-router'
import { Button } from 'react-bootstrap'

class Blog extends React.Component {
  constructor() {
    super()
  }

    removeButton = () => {
      if (this.props.user) {
        if (!this.props.blog.user || this.props.user.username === this.props.blog.user.username) {
          return (

            <Button onClick={this.props.remove(this.props.blog._id)} bsStyle="danger" type="submit">remove</Button>
          )
        }
      }
    }

    showAuthor = () => {
      if (this.props.blog.user) {
        return (
          <div> added by: {this.props.blog.user.username} </div>
        )
      }
      return (
        null
      )
    }

    render() {
      if (!this.props.blog) {
        return (
          <Redirect to="/blogs" />
        )
      }
      console.log(this.props.blog)
      return (
        <div>
          <h3> {this.props.blog.title} </h3>
          {this.showAuthor()}
          <div>
            <div>
              <button onClick={this.props.like(this.props.blog._id)}> like </button> {this.props.blog.likes}
            </div>
            <div>
              {this.removeButton()}
            </div>
          </div>
        </div>
      )
    }
}

export default Blog