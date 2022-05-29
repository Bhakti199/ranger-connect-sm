import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebaseconfig";

export const initialState = {
  posts: [],
  comments: [],
  error: null,
  statusAddPost: "idle",
  statusAllPost: "idle",
  statusEditPost: "idle",
  statusDeletePost: "idle",
  statusLikePost: "idle",
  statusDislikePost: "idle",
};

export const addPost = createAsyncThunk("post/addPost", async (postData) => {
  try {
    const postRef = await addDoc(collection(db, "posts"), {
      ...postData,
      likes: [],
    });
    await updateDoc(postRef, { id: postRef.id });
    const postSnap = await getDoc(postRef);
    const post = postSnap.data();
    const userSnap = await getDoc(doc(db, "users", post.userId));
    return { ...post, id: postSnap.id, user: userSnap.data() };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
});

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const allPostsSnap = await getDocs(collection(db, "posts"));
    let posts = [];
    for await (const post of allPostsSnap.docs) {
      const postData = post.data();
      const userRef = await getDoc(doc(db, "users", postData.userId));
      posts = [...posts, { user: userRef.data(), ...postData }];
    }
    return posts;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
});

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ postId, bookmarkId }) => {
    const postRef = doc(db, "posts", postId);
    try {
      await deleteDoc(postRef);
      if (bookmarkId) {
        await deleteDoc(doc(db, "bookmarks", bookmarkId));
      }
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
    await updateDoc(postDataRef, postData);
    const docRef = await getDoc(postDataRef);
    const editedData = { ...docRef.data(), id: postDataRef.id };
    return postData;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
});

export const likedUserPost = createAsyncThunk(
  "post/likedUserPost",
  async (PostId, { getState }) => {
    const userState = getState();
    const userData = userState.auth.user;

    try {
      const postDocumentRef = doc(db, "posts", PostId);
      const postRef = await updateDoc(postDocumentRef, {
        likes: arrayUnion(userData.id),
      });

      return { PostId, userId: userData.id };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const disLikedUserPost = createAsyncThunk(
  "post/disLikedUserPost",
  async (PostId, { getState }) => {
    const userState = getState();
    const userData = userState.auth.user;
    try {
      const postDocumentRef = doc(db, "posts", PostId);
      const postRef = await updateDoc(postDocumentRef, {
        likes: arrayRemove(userData.id),
      });

      return { PostId, userId: userData.id, isLiked: false };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const addComments = createAsyncThunk(
  "post/addComments",
  async ({ postId, comment }, { getState }) => {
    console.log("Comment", comment, postId);
    const userState = getState();
    const userData = userState.auth.user;
    try {
      const postscommentRef = await addDoc(collection(db, "comments"), {
        comment,
        postId,
        userData,
      });
      updateDoc(postscommentRef, { id: postscommentRef.id });
      const postSnapData = await getDoc(postscommentRef);
      return { ...postSnapData.data(), id: postSnapData.id };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);
export const getComments = createAsyncThunk("post/getComments", async () => {
  try {
    const allcommentsSnap = await getDocs(collection(db, "comments"));
    const allcomments = allcommentsSnap.docs.map((postdocument) =>
      postdocument.data()
    );
    return allcomments;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
});

export const deleteComments = createAsyncThunk(
  "post/deleteComments",
  async (commentId) => {
    const commentRef = doc(db, "comments", commentId);
    try {
      await deleteDoc(commentRef);
      return commentRef.id;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

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
        post.id === action.payload.id ? { ...post, ...action.payload } : post
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
    [likedUserPost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.PostId
          ? { ...post, likes: post.likes.concat(action.payload.userId) }
          : post
      );
      state.statusLikePost = "succeed";
    },
    [likedUserPost.pending]: (state, action) => {
      state.statusLikePost = "loading";
    },
    [disLikedUserPost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.PostId
          ? {
              ...post,
              likes: post.likes.filter((id) => id !== action.payload.userId),
            }
          : post
      );
      state.statusDislikePost = "succeed";
    },
    [disLikedUserPost.pending]: (state, action) => {
      state.statusDislikePost = "loading";
    },
    [addComments.fulfilled]: (state, action) => {
      state.comments = state.comments.concat(action.payload);
    },
    [getComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },
    [deleteComments.fulfilled]: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});
export default PostSlice.reducer;
