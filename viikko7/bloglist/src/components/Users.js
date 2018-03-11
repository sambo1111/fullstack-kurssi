import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class Users extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3> Users </h3>
        <div>
          <ListGroup>
            {this.props.users.map(user => <ListGroupItem key={user.id}>
              <Link to={`/users/${user.id}`}> {user.username} </Link>
            </ListGroupItem>)}
          </ListGroup>
        </div>
      </div>
    )
  }
}

export default Users