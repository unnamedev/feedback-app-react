import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import feedbackCreator from './feedbackCreator'

// =============================
// Action Creators:
// =============================
const getItems = createAsyncThunk('@@feedback/getItems', feedbackCreator.getItems)
const addItem = createAsyncThunk('@@feedback/addItem', feedbackCreator.addItem)
const updateItem = createAsyncThunk('@@feedback/updateItem', feedbackCreator.updateItem)
const deleteItem = createAsyncThunk('@@feedback/deleteItem', feedbackCreator.deleteItem)

// =============================
// Slice Configuration:
// =============================
const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        items: [],
        isEditing: {
            item: {},
            edit: false,
        },
        isLoading: false,
        isError: null,
    },
    reducers: {
        setEditing: (state, {payload}) => {
            state.isEditing = payload
        }
    },
    extraReducers: {
        // getItems
        [getItems.pending]: (state) => {
            state.isLoading = true
        },
        [getItems.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            state.isError = null
            state.items = payload
        },
        [getItems.rejected]: (state, {payload}) => {
            state.isLoading = false
            state.isError = payload
        },
        // addItem
        [addItem.pending]: (state) => {
            state.isLoading = true
        },
        [addItem.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            state.isError = null
            state.items = [...state.items, payload].sort((a, b) => b.id - a.id)
        },
        [addItem.rejected]: (state, {payload}) => {
            state.isLoading = false
            state.isError = payload
        },
        // updateItem
        [updateItem.pending]: (state) => {
            state.isLoading = true
        },
        [updateItem.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            state.isError = null
            state.items = state.items.map((item) => item.id === payload.id ? payload : item)
            state.isEditing = {
                item: {},
                edit: false,
            }
        },
        [updateItem.rejected]: (state, {payload}) => {
            state.isLoading = false
            state.isError = payload
        },
        // deleteFeedback
        [deleteItem.pending]: (state) => {
            state.isLoading = true
        },
        [deleteItem.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            state.isError = null
            state.items = state.items.filter((item) => item.id !== payload)
        },
        [deleteItem.rejected]: (state, {payload}) => {
            state.isLoading = false
            state.isError = payload
        },
    }
})

// =============================
// Exports:
// =============================
export const {setEditing} = feedbackSlice.actions
export default feedbackSlice.reducer
export const feedbackSliceActions = {
    getItems,
    addItem,
    updateItem,
    deleteItem,
}
