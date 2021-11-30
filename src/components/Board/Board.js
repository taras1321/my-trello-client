import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { showEditBoardModal } from '../../store/action'
import { getBackgroundColor } from '../../utils'
import './Board.css'

const Board = ({ board }) => {
  const [showEdit, setShowEdit] = useState(false)
  const dispatch = useDispatch()

  function clickEditHandler(event, board) {
    event.preventDefault()
    dispatch(showEditBoardModal(board))
  }

  const background = getBackgroundColor(board.color)
  return (
    <Link
      to={`/board/${board.id}`}
      className="Board"
      style={{ background }}
      onMouseOver={() => setShowEdit(true)}
      onMouseLeave={() => setShowEdit(false)}
    >
      <div className="board">{board.title}</div>
      {showEdit ? (
        <div
          className="edit-block"
          onClick={(e) => clickEditHandler(e, board)}
        >
          <span className="material-icons edit">edit</span>
        </div>
      ) : null}
    </Link>
  )
}

export default Board
