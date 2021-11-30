import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addList } from '../../store/action'
import './AddList.css'

const AddList = ({ closeForms, setCloseForms }) => {
  const dispatch = useDispatch()

  const [showForm, setShowForm] = useState(false)
  const [listName, setListName] = useState('')

  const inputRef = useRef(null)

  useEffect(() => {
    if (closeForms) {
      setShowForm(false)
    }
  }, [closeForms])

  function addListClickhandler() {
    setCloseForms(true)
    setListName('')

    setTimeout(() => {
      setCloseForms(false)
      setShowForm(true)
    }, 0)
  }

  function closeFormHandler() {
    setShowForm(false)
    setListName('')
  }

  function submitHandler(event) {
    event.preventDefault()
    if (!listName) {
      inputRef.current.focus()
      return
    }

    const list = {
      id: Date.now().toString(),
      title: listName,
      items: [],
    }

    dispatch(addList(list))

    setListName('')
    inputRef.current.focus()
  }

  function keyDownHandler(event) {
    if (event.key === 'Escape') {
      closeFormHandler()
    }
  }

  return (
    <div className="AddList" onClick={(e) => e.stopPropagation()}>
      {showForm ? (
        <form className="form" onKeyDown={keyDownHandler}>
          <input
            placeholder="List title"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            autoFocus
            ref={inputRef}
          />
          <div className="btns">
            <button
              className="btn-add"
              onClick={(e) => submitHandler(e)}
            >
              Add list
            </button>
            <span
              className="material-icons btn-close"
              onClick={closeFormHandler}
            >
              close
            </span>
          </div>
        </form>
      ) : (
        <div className="add" onClick={addListClickhandler}>
          <span className="material-icons add-icon">add</span>
          <span className="add-text">Add list</span>
        </div>
      )}
    </div>
  )
}

export default AddList
