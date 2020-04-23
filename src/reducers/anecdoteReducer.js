import anecdoteService from '../services/anecdotes'
/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]
*/

//const getId = () => (100000 * Math.random()).toFixed(0)

/*
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}
*/

//const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : action.data))
    default:
      return state
  }

  //return state
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newNecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newNecdote,
    })
  }
}
/*
export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id },
  }
}
*/

export const voteAnecdote = (id, newObject) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, newObject)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updatedAnecdote,
    })
  }
}

export default reducer
