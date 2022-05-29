import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  getDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { app, db } from "../../firebaseconfig";
import {
  deletePost,
  likedUserPost,
  disLikedUserPost,
} from "../PostSlice/PostSlice";
const initialState = {
  bookmarks: [],
  error: "",
  addBookmarkStatus: "idle",
  getBookmarksStatus: "idle",
  deleteBookmarkStatus: "idle",
  deletePostStatus: "idle",
};
const collectionRef = collection(db, "bookmarks");

export const addBookmark = createAsyncThunk(
  "bookmark/addBookmark",
  async (post, { getState }) => {
    const userState = getState();
    const userData = userState.auth.user;
    try {
      const bookmarkRef = await addDoc(collectionRef, {
        postId: post.id,
        userId: userData.id,
      });
      await updateDoc(bookmarkRef, { bookmarkId: bookmarkRef.id });
      const bookmark = { post, bookmarkId: bookmarkRef.id };
      return bookmark;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAllBookmarks = createAsyncThunk(
  "bookmark/getAllBookmarks",
  async (arg, { getState }) => {
    try {
      const userState = getState();
      const user = userState.auth.user;
      const bookmarkQuery = query(
        collectionRef,
        where("userId", "==", user.id)
      );
      const allBookmarksSnap = await getDocs(bookmarkQuery);
      let bookmarks = [];
      for await (const bookmark of allBookmarksSnap.docs) {
        const bookmarkData = bookmark.data();
        const postRef = await getDoc(doc(db, "posts", bookmarkData.postId));
        const userRef = await getDoc(doc(db, "users", postRef.data().userId));
        console.log(userRef.data());
        bookmarks = [
          ...bookmarks,
          {
            post: { ...postRef.data(), user: userRef.data() },
            bookmarkId: bookmark.id,
          },
        ];
      }
      return bookmarks;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const deleteBookmark = createAsyncThunk(
  "bookmark/deleteBookmark",
  async (bookmarkId) => {
    try {
      await deleteDoc(doc(db, "bookmarks", bookmarkId));
      return bookmarkId;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

const BookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: {
    [addBookmark.fulfilled]: (state, action) => {
      state.bookmarks = state.bookmarks.concat(action.payload);
      state.addBookmarkStatus = "succeed";
    },
    [addBookmark.pending]: (state, action) => {
      state.addBookmarkStatus = "loading";
    },
    [addBookmark.rejected]: (state, action) => {
      state.addBookmarkStatus = "rejected";
    },
    [getAllBookmarks.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.bookmarks = action.payload;
      state.getBookmarksStatus = "succeed";
    },
    [getAllBookmarks.pending]: (state, action) => {
      state.getAllBookmarksStatus = "loading";
    },
    [getAllBookmarks.rejected]: (state, action) => {
      state.error = action.error.message;
      state.getAllBookmarksStatus = "rejected";
    },
    [deleteBookmark.fulfilled]: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.bookmarkId !== action.payload
      );
      state.deleteBookmarkStatus = "succeed";
    },
    [deleteBookmark.rejected]: (state, action) => {
      state.error = action.error.message;
      state.deleteBookmarkStatus = "rejected";
    },
    [deleteBookmark.pending]: (state, action) => {
      state.deleteBookmarkStatus = "loading";
    },
    [deletePost.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.bookmarks = state.bookmarks.filter((bookmark) => {
        console.log(bookmark);
        return bookmark.post.id !== action.payload;
      });
      console.log(current(state));
      state.deletePostStatus = "succeed";
    },
    [likedUserPost.fulfilled]: (state, action) => {
      state.bookmarks = state.bookmarks.map((bookmark) => {
        if (bookmark.post.id === action.payload.PostId) {
          return {
            ...bookmark,
            post: {
              ...bookmark.post,
              likes: bookmark.post.likes.concat(action.payload.userId),
            },
          };
        }
        return bookmark;
      });
    },
    [disLikedUserPost.fulfilled]: (state, action) => {
      state.bookmarks = state.bookmarks.map((bookmark) => {
        if (bookmark.post.id === action.payload.PostId) {
          return {
            ...bookmark,
            post: {
              ...bookmark.post,
              likes: bookmark.post.likes.filter(
                (id) => id !== action.payload.userId
              ),
            },
          };
        }
        return bookmark;
      });
    },
  },
});

export default BookmarkSlice.reducer;
