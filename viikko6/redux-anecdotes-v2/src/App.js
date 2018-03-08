import React from 'react'
import ConnectedNotification from './components/Notification'
import ConnectedAnecdoteForm from './components/AnecdoteForm'
import ConnectedAnecdoteList from './components/AnecdoteList'
import ConnectedFilter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { connect } from 'react-redux'
import {initAnecdotes} from './reducers/anecdoteReducer'

class App extends React.Component {

  componentDidMount = async () => {
    this.props.initAnecdotes()
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <ConnectedNotification />
        <ConnectedFilter />
        <ConnectedAnecdoteList  />
        <ConnectedAnecdoteForm  />
      </div>
    )
  }
}

export default connect(
  null,
  {initAnecdotes}
)(App)