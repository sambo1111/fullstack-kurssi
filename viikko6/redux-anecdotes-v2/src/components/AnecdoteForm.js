import React from 'react'
import {createNew} from '../reducers/anecdoteReducer'
import PropTypes from 'prop-types'
import {setNotification, removeNotification, notify} from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.createNew(content)
    this.props.notify(`You have created a new anecdote!`, 10)

  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

const ConnectedAnecdoteForm = connect(
  null,
  {createNew, setNotification, removeNotification, notify}
)(AnecdoteForm)

export default ConnectedAnecdoteForm
