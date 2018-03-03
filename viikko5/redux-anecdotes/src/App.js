import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      anecdote: ''
    }
  }

  voteAnecdote = (id) => () => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: {
        id
      }
    })
  }

  handleAnecdoteChange = (event) => {
    this.setState({
      anecdote: event.target.value
    })
  }

  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch({
      type: 'ADD_NEW',
      data: {
        content: this.state.anecdote
      }
    })
  }

  render() {
    const anecdotes = this.props.store.getState().sort(function(a, b) {
      return b.votes - a.votes
    })
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote.id)}>
                vote
              </button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input onChange={this.handleAnecdoteChange}/></div>
          <button onClick={this.addAnecdote}>create</button>
        </form>
      </div>
    )
  }
}

export default App