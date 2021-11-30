import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addItem, showEditListModal } from '../../store/action'
import Item from '../Item/Item'
import './List.css'

const List = (props) => {
  const { list, closeForms, setCloseForms } = props
  const dispatch = useDispatch()
  const textRef = useRef(null)

  const [showForm, setShowForm] = useState(false)
  const [itemName, setItemName] = useState('')

  useEffect(() => {
    if (closeForms) {
      setItemName('')
      setShowForm(false)
    }
  }, [closeForms])

  function addItemHandler(event) {
    event.stopPropagation()
    setCloseForms(true)

    setTimeout(() => {
      setCloseForms(false)
      setShowForm(true)
    }, 0)
  }

  function submitHandler(event) {
    if (event) {
      event.preventDefault()
    }

    if (itemName === '') {
      textRef.current.focus()
      return
    }

    const item = {
      id: Date.now().toString(),
      name: itemName,
    }

    dispatch(addItem(item, list.id))

    setItemName('')
    textRef.current.focus()
  }

  function closeFormHandler() {
    setItemName('')
    setShowForm(false)
  }

  function editListHandler() {
    dispatch(showEditListModal(list))
  }

  function keyDownHandler(event) {
    if (event.key === 'Escape') {
      closeFormHandler()
    } else if (event.key === 'Enter') {
      event.preventDefault()
      submitHandler()
    }
  }

  return (
    <div className="List">
      <div className="list-wrapper">
        <div className="list">
          <div className="list-header">
            <div className="title">{list.title}</div>

            <div className="edit-block" onClick={editListHandler}>
              <span className="material-icons edit">edit</span>
            </div>
          </div>
          {list.items.map((item) => (
            <Item item={item} key={item.id} list={list} />
          ))}

          {showForm ? (
            <form
              className="form"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={keyDownHandler}
            >
              <textarea
                placeholder="Item title"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                autoFocus
                ref={textRef}
              />
              <div className="btns">
                <button
                  className="btn-add"
                  onClick={(e) => submitHandler(e)}
                >
                  Add item
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
            <div className="add-item" onClick={addItemHandler}>
              <div className="add">
                <span className="material-icons add-icon">add</span>
                <span className="add-text">Add item</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default List
