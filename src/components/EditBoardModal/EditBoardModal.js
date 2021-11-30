import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeEditBoardModal,
  editBoard,
  removeBoard,
} from '../../store/action'
import './EditBoardModal.css'

const EditBoardModal = () => {
  const board = useSelector((state) => state.activeBoard)
  const dispatch = useDispatch()

  const [title, setTitle] = useState(board.title)
  const [color, setColor] = useState(board.color)

  function closeModalHandler() {
    dispatch(closeEditBoardModal())
  }

  function removeHandler() {
    dispatch(removeBoard(board.id))
    closeModalHandler()
  }

  function saveHandler() {
    dispatch(editBoard({ title, color, lists: board.lists }))
    closeModalHandler()
  }

  function keyDownHandler(event) {
    if (event.key === 'Escape') {
      closeModalHandler()
    } else if (event.key === 'Enter') {
      if (!title) {
        return
      }
      saveHandler()
    }
  }

  return (
    <div
      className="EditBoardModal"
      onClick={closeModalHandler}
      onKeyDown={keyDownHandler}
    >
      <div className="modal-el" onClick={(e) => e.stopPropagation()}>
        <input
          placeholder="Board name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <div className="colors">
          <div className="blue" onClick={() => setColor('blue')}>
            {color === 'blue' ? (
              <span className="material-icons select">done</span>
            ) : null}
          </div>
          <div className="orange" onClick={() => setColor('orange')}>
            {color === 'orange' ? (
              <span className="material-icons select">done</span>
            ) : null}
          </div>
          <div className="green" onClick={() => setColor('green')}>
            {color === 'green' ? (
              <span className="material-icons select">done</span>
            ) : null}
          </div>
        </div>

        <button
          className="btn-save"
          onClick={saveHandler}
          disabled={!title}
        >
          Save
        </button>
        <button className="btn-delete" onClick={removeHandler}>
          Delete board
        </button>

        <span
          className="material-icons close"
          onClick={closeModalHandler}
        >
          close
        </span>
      </div>
    </div>
  )
}

export default EditBoardModal
