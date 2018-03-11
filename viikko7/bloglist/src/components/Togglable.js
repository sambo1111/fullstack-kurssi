import React from 'react'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

    toggleVisibility = () => {
      this.setState({ visible: !this.state.visible })
      console.log(this.state.visible)
    }

    render() {
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }

      const openButtonStyle = {
        backgroundColor: '#4CAF50',
        border: 'solid',
        color: 'white',
        padding: 10,
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inlineBlock',
        fontSize: 16,
        marginTop: 5,
        borderRadius: 10
      }

      const hideButtonStyle = {
        backgroundColor: '#81BEF7',
        border: 'solid',
        color: 'white',
        padding: 10,
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inlineBlock',
        fontSize: 16,
        borderRadius: 10
      }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button style={openButtonStyle} onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
          </div>
          <div style={showWhenVisible}>
            {this.props.children}
            <button style={hideButtonStyle} onClick={this.toggleVisibility}>hide</button>
          </div>
        </div>
      )
    }
}

export default Togglable