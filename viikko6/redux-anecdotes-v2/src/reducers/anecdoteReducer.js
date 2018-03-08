import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createNew = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteToUpdate = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type:'VOTE',
      id: anecdote.id
    })
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === 'CREATE') {

    return [...store, action.data]
  }

  if (action.type === 'INIT') {
    return action.data
  }
  return store
}

export default reducer