import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0,0,0,0,0,0]
    }
  }

  rand = () => {
    const size = anecdotes.length
    const random = Math.floor(Math.random() * size)
    this.setState({
      selected: random
    })
  }

  vote = () => {
    const newVotes = this.state.votes
    newVotes[this.state.selected]++
    this.setState({
      votes: newVotes
    })
  }

  render() {
    return (
      <div>
      <div>{this.props.anecdotes[this.state.selected]}</div>
      <div> votes: {this.state.votes[this.state.selected]}</div>
      <button onClick={this.rand}> next </button>
      <button onClick={this.vote}> vote </button>
      <MostVotes state={this.state} anecdotes={this.props.anecdotes}/>
      </div>
    )
  }
}

const MostVotes = (props) => {
  var most = 0
  var index = 0
  for (var i = 0; i < props.state.votes.length; i++) {
    if (props.state.votes[i] > most) {
      index = i
      most = props.state.votes[i]
    }
  }
  return (
    <div>
      <h1> Most voted anecdote </h1>
      <div>{props.anecdotes[index]}</div>
      <div>votes: {props.state.votes[index]}</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)
