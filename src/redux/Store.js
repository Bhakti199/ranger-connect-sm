import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice/AuthSlice";
import postReducer from "./PostSlice/PostSlice";
import bookmarkReducer from "./BookmarkSlice/BookmarkSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    bookmark: bookmarkReducer,
  },
});
