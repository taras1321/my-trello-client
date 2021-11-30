import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchBoardById } from '../../store/action'
import Loader from '../../components/Loader/Loader'
import { getBackgroundColor } from '../../utils'
import AddList from '../../components/AddList/AddList'
import List from '../../components/List/List'
import EditListModal from '../../components/EditListModal/EditListModal'
import './BoardPage.css'

const BoardPage = (props) => {
  const dispatch = useDispatch()

  const loading = useSelector((state) => state.loading)
  const showEditListModal = useSelector(
    (state) => state.showEditListModal
  )
  const board = useSelector((state) => state.activeBoard)

  const [closeForms, setCloseForms] = useState(false)
  const id = props.match.params.id

  useEffect(() => {
    dispatch(fetchBoardById(id))
  }, [dispatch, id])

  function clickBaordHandler() {
    setCloseForms(true)
    setTimeout(() => setCloseForms(false), 0)
  }

  return (
    <>
      {loading ? <Loader /> : null}

      {board ? (
        <div
          className="BoardPage"
          style={{ background: getBackgroundColor(board.color) }}
          onClick={clickBaordHandler}
        >
          <div className="header">
            <Link
              className="logo"
              to="/"
              onClick={(e) => e.stopPropagation()}
            >
              My Trello
            </Link>
            <span className="board-title">{board.title}</span>
          </div>
          <div className="board">
            {board.lists.map((list) => (
              <List
                key={list.id}
                list={list}
                closeForms={closeForms}
                setCloseForms={setCloseForms}
              />
            ))}
            <AddList
              closeForms={closeForms}
              setCloseForms={setCloseForms}
            />
            {showEditListModal ? <EditListModal /> : null}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default BoardPage
