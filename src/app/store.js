import {configureStore} from "@reduxjs/toolkit"
import feedback from "../features/feedbackSlice"

// ==========================
// Store
// ==========================
export const store = configureStore({
    reducer: {
        feedback,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})