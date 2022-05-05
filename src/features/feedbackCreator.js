import axios from 'axios'

// =============================
// Axios configuration:
// =============================
const api = axios.create({
    baseURL: 'http://localhost:5000/feedback',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})

// =============================
// Functions:
// =============================

/**
 * Fetch items
 * @param _ - This is the first parameter that is passed to the thunk. It is the Redux state.
 * @param thunkAPI - The thunk API object.
 * @returns The data from the API call.
 */
const getItems = async (_, thunkAPI) => {
    try {
        const {data} = await api.get(`?_sort=id&_order=desc`);
        return data
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
}

/**
 * Add item
 * @param text - The text to be sent to the API.
 * @param rating - The rating to be sent to the API.
 * @param thunkAPI - The thunk API object.
 * @returns The data from the api call
 */
const addItem = async ({text, rating}, thunkAPI) => {
    try {
        const {data} = await api.post({text, rating: Number(rating)})
        return data
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
}

/**
 * Update item
 * @param id - The id of the item to update
 * @param updateItem - The updated item
 * @param thunkAPI - This is an object that contains the following properties:
 * @returns The data from the response.
 */
const updateItem = async ({id, updateItem}, thunkAPI) => {
    try {
        const {data} = await axios.put(`/${id}`, updateItem)
        return data
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
}

/**
 * Delete item
 * @param id - The id of the item to delete
 * @param thunkAPI - This is the object that contains the dispatch, getState, and rejectWithValue functions.
 * @returns The id of the item that was deleted.
 */
const deleteItem = async (id, thunkAPI) => {
    if (window.confirm('Are you sure you want to delete?')) {
        try {
            await api.delete(`/${id}`)
            return id
        } catch (e) {
            const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
}

const feedbackCreator = {
    getItems,
    addItem,
    updateItem,
    deleteItem
}

export default feedbackCreator