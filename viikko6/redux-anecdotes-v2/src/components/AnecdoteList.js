import React from 'react'
import {vote} from '../reducers/anecdoteReducer'
import PropTypes from 'prop-types'
import {setNotification, removeNotification, notify} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  voteAnecdote = async (anecdote) => {
    console.log(anecdote)
    this.props.vote(anecdote)
    this.props.notify(`You have voted anecdote "${anecdote.content}"!`, 10)
    setTimeout(() => {
      this.props.removeNotification()
    },5000)
  }

  render() {
     return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotesFiltered.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.voteAnecdote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

const anecdotesToShow = (anecdotes, filter) => {
  const anecdotesFiltered = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  return anecdotesFiltered.sort((a,b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes,
    anecdotesFiltered: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  {vote, setNotification, removeNotification, notify}
)(AnecdoteList)

export default ConnectedAnecdoteList
