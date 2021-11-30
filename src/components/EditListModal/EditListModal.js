import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeEditListModal,
  editListTitle,
  removeList,
} from '../../store/action'
import './EditListModal.css'

const EditListModal = () => {
  const dispatch = useDispatch()

  const activeList = useSelector((state) => state.activeList)
  const [title, setTitle] = useState(activeList.title)

  function closeHandler() {
    dispatch(closeEditListModal())
  }

  function saveHandler() {
    if (!title) {
      return
    }

    dispatch(editListTitle(title))
    closeHandler()
  }

  function removeHandler() {
    dispatch(removeList())
    closeHandler()
  }

  function keyDownHandler(event) {
    if (event.key === 'Escape') {
      closeHandler()
    } else if (event.key === 'Enter') {
      saveHandler()
    }
  }

  return (
    <div className="EditListModal">
      <div className="modal-wrapper" onClick={closeHandler}>
        <div
          className="modal-el"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={keyDownHandler}
        >
          <input
            placeholder="List title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <button className="btn-save" onClick={saveHandler}>
            Save
          </button>
          <button className="btn-delete" onClick={removeHandler}>
            Delete list
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditListModal
