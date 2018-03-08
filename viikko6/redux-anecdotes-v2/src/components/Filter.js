import React from 'react'
import PropTypes from 'prop-types'
import {setFilter} from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
    handleChange = (event) => {
      event.preventDefault()
      this.props.setFilter(event.target.value)
    }
    render() {
      const style = {
        marginBottom: 10
      }
  
      return (
        <div style={style}>
          filter <input onChange={this.handleChange}/>
        </div>
      )
    }
  }

  Filter.contextTypes = {
    store: PropTypes.object
  }

  const ConnectedFilter = connect(
      null,
      {setFilter}
  )(Filter)

export default ConnectedFilter