import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (!this.props.notification || !this.props.store) {
      return null
    }

    return (
      <div>
        {this.props.store.getState().notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)