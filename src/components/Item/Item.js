import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showEditItemModal } from '../../store/action'
import EditItemModal from '../EditItemModal/EditItemModal'
import './Item.css'

const Item = ({ item, list }) => {
  const el = useRef(null)
  const dispatch = useDispatch()

  const [showEdit, setShowEdit] = useState(false)
  const showEditItemModalWindow = useSelector(
    (state) => state.showEditItemModal
  )
  const activeItem = useSelector((state) => state.activeItem)

  function clickEditHandler() {
    dispatch(showEditItemModal(list, item))
  }

  function getCoords() {
    return {
      x: el.current.getBoundingClientRect().x,
      y: el.current.getBoundingClientRect().y,
    }
  }

  return (
    <div
      onMouseOver={() => setShowEdit(true)}
      onMouseLeave={() => setShowEdit(false)}
      className="Item"
      ref={el}
    >
      {item.name}

      {showEdit ? (
        <div className="item-edit-block" onClick={clickEditHandler}>
          <span className="material-icons item-edit">edit</span>
        </div>
      ) : null}

      {showEditItemModalWindow && item.id === activeItem.id ? (
        <EditItemModal
          setShowEdit={setShowEdit}
          getCoords={getCoords}
        />
      ) : null}
    </div>
  )
}

export default Item
