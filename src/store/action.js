import { createAction } from '@reduxjs/toolkit'
import { API_URL } from '../config'

export const boardsFetching = createAction('BOARDS_FETCHING')
export const boardByIdFetching = createAction('BOARD_BY_ID_FETCHING')
export const boardAdding = createAction('BOARD_ADDING')
export const start = createAction('START')
export const newBoardModal = createAction('NEW_BOARD_MODAL')
export const editBoardModal = createAction('BOARD_EDIT')
export const boardEditing = createAction('BOARD_EDITING')
export const listAdding = createAction('LIST_ADDING')
export const itemAdding = createAction('ITEM_ADDING')
export const editListModal = createAction('EDIT_LIST')
export const listEditing = createAction('LIST_EDITING')
export const editItemModal = createAction('EDIT_ITEM')
export const itemEditing = createAction('ITEM_EDITING')

export function fetchBoards() {
  return async (dispatch) => {
    dispatch(start())

    const boards = []
    try {
      const response = await fetch(`${API_URL}api/board`)

      const data = await response.json()

      data.boards.forEach((board) => {
        board.id = board._id
        delete board._id
        boards.push(board)
      })
    } catch (e) {
      console.log(e)
    }

    dispatch(boardsFetching({ boards }))
  }
}

export function fetchBoardById(id) {
  return async (dispatch, getState) => {
    if (getState().boards.length) {
      const board = getState().boards.find((b) => b.id === id)

      dispatch(boardByIdFetching({ board }))

      return
    }

    dispatch(start())

    const response = await fetch(`${API_URL}api/board/${id}`)

    const data = await response.json()
    const board = data.board

    board.id = board._id
    delete board._id

    dispatch(boardByIdFetching({ board }))
  }
}

export function addBoard(board) {
  return async (dispatch) => {
    board.list = []
    try {
      const response = await fetch(`${API_URL}api/board`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(board),
      })

      const data = await response.json()

      data.id = data._id
      delete data._id

      dispatch(boardAdding({ board: data }))
    } catch (e) {
      console.log(e)
    }
  }
}

export function showNewBoardModal() {
  return newBoardModal({ show: true })
}

export function closeNewBoardModal() {
  return newBoardModal({ show: false })
}

export function showEditBoardModal(board) {
  return editBoardModal({ show: true, board })
}

export function closeEditBoardModal() {
  return editBoardModal({ show: false })
}

export function removeBoard(id) {
  return async (dispatch, getState) => {
    const newBoards = getState().boards.filter(
      (board) => board.id !== id
    )

    dispatch(boardEditing({ boards: newBoards }))

    try {
      await fetch(`${API_URL}api/board/${id}`, {
        method: 'delete',
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function editBoard({ title, color, lists }) {
  return async (dispatch, getState) => {
    let boards = [...getState().boards]
    const board = { ...getState().activeBoard }

    board.title = title
    board.color = color
    board.lists = lists

    boards = boards.map((b) => {
      if (b.id === board.id) {
        return board
      }

      return b
    })

    dispatch(boardEditing({ boards }))

    try {
      await fetch(`${API_URL}api/board/${board.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, color, lists }),
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function addList(list) {
  return async (dispatch, getState) => {
    const board = { ...getState().activeBoard }
    const lists = [...getState().activeBoard.lists]

    lists.push(list)
    board.lists = lists

    dispatch(listAdding({ board }))

    try {
      await fetch(`${API_URL}api/board/${board.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: board.title,
          color: board.color,
          lists,
        }),
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function addItem(item, listId) {
  return async (dispatch, getState) => {
    const board = { ...getState().activeBoard }
    const currentBoard = JSON.parse(JSON.stringify(board))

    currentBoard.lists
      .find((list) => list.id === listId)
      .items.push(item)

    dispatch(itemAdding({ board: currentBoard }))

    try {
      await fetch(`${API_URL}api/board/${board.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: currentBoard.title,
          color: currentBoard.color,
          lists: currentBoard.lists,
        }),
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function showEditListModal(list) {
  return editListModal({ show: true, list })
}

export function closeEditListModal() {
  return editListModal({ show: false })
}

export function editListTitle(title) {
  return async (dispatch, getState) => {
    const board = getState().activeBoard
    const list = { ...getState().activeList }
    const currentBoard = JSON.parse(JSON.stringify(board))

    list.title = title

    const lists = currentBoard.lists.map((lst) => {
      if (lst.id === list.id) {
        return list
      }

      return lst
    })

    currentBoard.lists = lists

    dispatch(listEditing({ board: currentBoard }))

    try {
      await fetch(`${API_URL}api/board/${board.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: currentBoard.title,
          color: currentBoard.color,
          lists: currentBoard.lists,
        }),
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function removeList() {
  return async (dispatch, getState) => {
    const board = getState().activeBoard
    const list = { ...getState().activeList }
    const currentBoard = JSON.parse(JSON.stringify(board))

    const lists = currentBoard.lists.filter(
      (lst) => lst.id !== list.id
    )

    currentBoard.lists = lists

    dispatch(listEditing({ board: currentBoard }))

    try {
      await fetch(`${API_URL}api/board/${board.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: currentBoard.title,
          color: currentBoard.color,
          lists: currentBoard.lists,
        }),
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function showEditItemModal(list, item) {
  return editItemModal({ show: true, list, item })
}

export function closeEditItemModal() {
  return editItemModal({ show: false })
}

export function removeItem() {
  return async (dispatch, getState) => {
    const board = JSON.parse(JSON.stringify(getState().activeBoard))
    const list = JSON.parse(JSON.stringify(getState().activeList))
    const item = { ...getState().activeItem }

    list.items = list.items.filter((i) => i.id !== item.id)

    board.lists = board.lists.map((lst) => {
      if (lst.id === list.id) {
        return list
      }
      return lst
    })

    dispatch(itemEditing({ board }))

    try {
      await fetch(`${API_URL}api/board/${board.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: board.title,
          color: board.color,
          lists: board.lists,
        }),
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function editItem(name) {
  return async (dispatch, getState) => {
    const board = JSON.parse(JSON.stringify(getState().activeBoard))
    const list = JSON.parse(JSON.stringify(getState().activeList))
    const item = { ...getState().activeItem }

    list.items = list.items.map((i) => {
      if (i.id === item.id) {
        item.name = name
        return item
      }

      return i
    })

    board.lists = board.lists.map((lst) => {
      if (lst.id === list.id) {
        return list
      }
      return lst
    })

    dispatch(itemEditing({ board }))

    try {
      await fetch(`${API_URL}api/board/${board.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: board.title,
          color: board.color,
          lists: board.lists,
        }),
      })
    } catch (e) {
      console.log(e)
    }
  }
}
