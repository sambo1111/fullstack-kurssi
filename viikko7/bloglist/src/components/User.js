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
          <table width={200}>
            {this.props.user.blogs.map(b => <tr key={b.id}> <td>{b.title}</td> <td>{b.likes}</td> </tr>)}
          </table>
        </div>
      </div>
    )
  }
}

export default User