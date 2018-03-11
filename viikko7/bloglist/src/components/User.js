import React from 'react'

class User extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3> {this.props.user.username} </h3>
        <div>
          {this.props.user.blogs.map(b => <li key={b.id}> {b.title} </li>)}
        </div>
      </div>
    )
  }
}

export default User