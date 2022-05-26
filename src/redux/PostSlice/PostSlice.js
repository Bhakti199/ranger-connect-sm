import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebaseconfig";

export const addPost = createAsyncThunk("post/addPost", async (postData) => {
  try {
    const postRef = await addDoc(collection(db, "posts"), postData);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      return { ...postSnap.data(), id: postSnap.id };
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
});

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    console.log(querySnapshot);
    const posts = querySnapshot.docs.map((document) => ({
      ...document.data(),
      id: document.id,
    }));
    return posts;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
});

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId) => {
    const postRef = doc(db, "posts", postId);
    try {
      const deletedPost = await deleteDoc(postRef);
      return postRef.id;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const editPost = createAsyncThunk("post/editPost", async (postData) => {
  const postDataRef = doc(db, "posts", postData.id);
  try {
    const updatedPost = await updateDoc(postDataRef, postData);
    const docRef = await getDoc(postDataRef);
    const editedData = { ...docRef.data(), id: postDataRef.id };
    return editedData;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
});

export const initialState = {
  posts: [],
  error: null,
  statusAddPost: "idle",
  statusAllPost: "idle",
  statusEditPost: "idle",
  statusDeletePost: "idle",
};
const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [addPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
      state.statusAddPost = "succeed";
    },
    [addPost.rejected]: (state, action) => {
      state.error = action.error.message;
      state.statusAddPost = "failed";
    },
    [addPost.pending]: (state, action) => {
      state.statusAddPost = "loading";
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.statusAllPost = "fulfilled";
    },
    [getAllPosts.rejected]: (state, action) => {
      state.error = action.error.message;
      state.statusAllPost = "failed";
    },
    [getAllPosts.pending]: (state, action) => {
      state.statusAllPost = "pending";
    },
    [editPost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
      state.statusEditPost = "fulfilled";
    },
    [editPost.rejected]: (state, action) => {
      state.error = action.error.message;
      state.statusEditPost = "failed";
    },
    [editPost.pending]: (state, action) => {
      state.statusEditPost = "pending";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts = state.posts.filter((post) => post.id != action.payload);
      state.statusDeletePost = "fulfilled";
    },
    [deletePost.rejected]: (state, action) => {
      state.error = action.error.message;
      state.statusDeletePost = "rejected";
    },
    [deletePost.pending]: (state, action) => {
      state.statusDeletePost = "pending";
    },
  },
});
export default PostSlice.reducer;
