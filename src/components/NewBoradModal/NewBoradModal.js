import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBoard, closeNewBoardModal } from '../../store/action'
import { getBackgroundColor } from '../../utils'
import './NewBoradModal.css'

const NewBoradModal = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [color, setColor] = useState('blue')

  function closeModalHandler() {
    dispatch(closeNewBoardModal())
  }

  function changeInputHandler(event) {
    setTitle(event.target.value)
  }

  function submitHandler(event) {
    event.preventDefault()

    dispatch(addBoard({ title, color }))
    closeModalHandler()
  }

  function keyPressHandler(event) {
    if (event.key === 'Escape') {
      closeModalHandler()
    }
  }

  return (
    <div className="NewBoradModal" onClick={closeModalHandler}>
      <div
        className="modal-el"
        onClick={(e) => e.stopPropagation()}
        style={{ background: getBackgroundColor(color) }}
        onKeyDown={keyPressHandler}
      >
        <form>
          <input
            placeholder="Add board name"
            onChange={changeInputHandler}
            autoFocus
          />
          <button onClick={submitHandler} disabled={!title}>
            Create
          </button>
        </form>
        <span
          className="material-icons close"
          onClick={closeModalHandler}
        >
          close
        </span>
      </div>
      <div
        className="colors"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={keyPressHandler}
      >
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
    </div>
  )
}

export default NewBoradModal
