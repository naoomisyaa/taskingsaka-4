import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/postSlice";

export const store = configureStore({
    reducer: {
        posts: postsSlice
    },
})
