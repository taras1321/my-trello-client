import { createReducer } from '@reduxjs/toolkit'
import {
  boardAdding,
  boardsFetching,
  newBoardModal,
  start,
  editBoardModal,
  boardEditing,
  boardByIdFetching,
  listAdding,
  itemAdding,
  editListModal,
  listEditing,
  editItemModal,
  itemEditing,
} from './action'

const ininialState = {
  showNewBoardModal: false,
  showEditBoardModal: false,
  showEditListModal: false,
  showEditItemModal: false,
  activeBoard: null,
  activeList: null,
  activeItem: null,
  loading: false,
  boards: [],
}

export const reducer = createReducer(ininialState, {
  [boardsFetching]: (state, action) => {
    state.boards = action.payload.boards
    state.loading = false
  },
  [start]: (state) => {
    state.loading = true
    state.activeBoard = null
  },
  [newBoardModal]: (state, action) => {
    state.showNewBoardModal = action.payload.show
  },
  [boardAdding]: (state, action) => {
    state.boards = [...state.boards, action.payload.board]
  },
  [editBoardModal]: (state, action) => {
    state.showEditBoardModal = action.payload.show
    state.activeBoard = action.payload.board || null
  },
  [boardEditing]: (state, action) => {
    state.boards = action.payload.boards
  },
  [boardByIdFetching]: (state, action) => {
    state.activeBoard = action.payload.board
    state.loading = false
  },
  [listAdding]: (state, action) => {
    state.activeBoard = action.payload.board
  },
  [itemAdding]: (state, action) => {
    state.activeBoard = action.payload.board
  },
  [editListModal]: (state, action) => {
    state.showEditListModal = action.payload.show
    state.activeList = action.payload.list || null
  },
  [listEditing]: (state, action) => {
    state.activeBoard = action.payload.board
  },
  [editItemModal]: (state, action) => {
    state.showEditItemModal = action.payload.show
    state.activeList = action.payload.list || null
    state.activeItem = action.payload.item || null
  },
  [itemEditing]: (state, action) => {
    state.activeBoard = action.payload.board
  },
})
