import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeEditItemModal,
  editItem,
  removeItem,
} from '../../store/action'
import './EditItemModal.css'

const EditItemModal = (props) => {
  const dispatch = useDispatch()

  const activeItem = useSelector((state) => state.activeItem)
  const [itemName, setItemName] = useState(activeItem.name)

  const textEl = useRef(null)

  useEffect(() => {
    textEl.current.focus()
    textEl.current.select()
  }, [])

  function closeHandler() {
    dispatch(closeEditItemModal())
    props.setShowEdit(false)
  }

  function saveHandler() {
    if (!itemName) {
      return
    }

    dispatch(editItem(itemName))
    closeHandler()
  }

  function removeHandler() {
    dispatch(removeItem())
    closeHandler()
  }

  function keyDownHandler(event) {
    if (event.key === 'Escape') {
      closeHandler()
    } else if (event.key === 'Enter') {
      event.preventDefault()
      saveHandler()
    }
  }

  const modalStyles = {
    top: props.getCoords().y,
    left: props.getCoords().x,
  }

  return (
    <div className="EditItemModal">
      <div className="wrapper" onClick={closeHandler}>
        <div
          className="modal"
          onKeyDown={keyDownHandler}
          style={modalStyles}
        >
          <textarea
            placeholder="Item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            ref={textEl}
          ></textarea>
          <button className="btn-save" onClick={saveHandler}>
            Save
          </button>
          <button className="btn-delete" onClick={removeHandler}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditItemModal
