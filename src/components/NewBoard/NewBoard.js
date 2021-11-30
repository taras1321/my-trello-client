import React from 'react'
import { useDispatch } from 'react-redux'
import { showNewBoardModal } from '../../store/action'
import './NewBoard.css'

const NewBoard = () => {
  const dispatch = useDispatch()

  function newBoardHanlder(e) {
    dispatch(showNewBoardModal())
  }

  return (
    <div className="NewBoard" onClick={newBoardHanlder}>
      <span className="material-icons icon">add_circle</span>
      <span className="text">Create new board</span>
    </div>
  )
}

export default NewBoard
