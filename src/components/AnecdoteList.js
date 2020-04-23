import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Filter from './Filter'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
//import { showNotification } from '../reducers/notificationReducer'
//import { clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const vote = (anecdote) => {
    const anecdoteToVote = anecdotes.find((a) => a.id === anecdote.id)
    const newObject = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
    dispatch(voteAnecdote(anecdote.id, newObject))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 2))
  }

  return (
    <div>
      <Filter />
      {anecdotes
        .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
        ))}
    </div>
  )
}

export default AnecdoteList
