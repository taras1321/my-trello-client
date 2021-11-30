import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoards } from '../../store/action'
import Loader from '../../components/Loader/Loader'
import Board from '../../components/Board/Board'
import NewBoard from '../../components/NewBoard/NewBoard'
import NewBoradModal from '../../components/NewBoradModal/NewBoradModal'
import EditBoardModal from '../../components/EditBoardModal/EditBoardModal'
import './HomePage.css'

function HomePage() {
  const dispatch = useDispatch()

  const loading = useSelector((state) => state.loading)
  const boards = useSelector((state) => state.boards)
  const showNewBoardModal = useSelector(
    (state) => state.showNewBoardModal
  )
  const showEditBoardModal = useSelector(
    (state) => state.showEditBoardModal
  )

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  return (
    <div className="Home">
      <Link to="/" className="logo">
        My Trello
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <div className="boards">
          {boards.map((board) => (
            <Board key={board.id} board={board} />
          ))}
          <NewBoard />
        </div>
      )}
      {showNewBoardModal ? <NewBoradModal /> : null}
      {showEditBoardModal ? <EditBoardModal /> : null}
    </div>
  )
}

export default HomePage
