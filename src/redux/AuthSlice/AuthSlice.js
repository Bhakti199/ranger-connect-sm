import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { app, db } from "../../firebaseconfig";

export const SignUp = createAsyncThunk(
  "auth/SignUp",
  async ({ firstName, lastName, userName, email, password }) => {
    try {
      const auth = getAuth(app);
      const data = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", data.user.uid), {
        firstName,
        lastName,
        userName,
        email,
        id: data.user.uid,
        photoUrl:
          "https://res.cloudinary.com/bhakti1801/image/upload/v1652444433/model8_rvnzuo.jpg",
      });
      return {
        firstName,
        lastName,
        userName,
        email,
        id: data.user.uid,
        photoUrl:
          "https://res.cloudinary.com/bhakti1801/image/upload/v1652444433/model8_rvnzuo.jpg",
      };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }) => {
    try {
      console.log(email, password);
      const auth = getAuth(app);
      const data = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", data.user.uid));
      return userDoc.data();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", () => {
  try {
    const auth = getAuth(app);
    signOut(auth).then(() => {
      console.log("logged out");
    });
  } catch (err) {
    console.error(error);
    return Promise.reject(error);
  }
});

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (arg, { getState }) => {
    try {
      const userstate = getState();
      const user = userstate.auth.user;
      const userRef = collection(db, "users");

      // Create a query against the collection.
      const userQuery = query(userRef, where("email", "!=", user.email));
      const userquerySnapshot = await getDocs(userQuery);
      const users = userquerySnapshot.docs.map((userdocument) => ({
        ...userdocument.data(),
        id: userdocument.id,
      }));
      return users;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const followUser = createAsyncThunk(
  "auth/followUser",
  async (followuserId, { getState }) => {
    const userstate = getState();
    const userData = userstate.auth.user;
    try {
      const userRef = doc(db, "users", userData.id);
      const userUpdatedRef = await updateDoc(userRef, {
        following: arrayUnion(followuserId),
      });

      const followrUserRef = doc(db, "users", followuserId);
      const followersUserRef = await updateDoc(followrUserRef, {
        followers: arrayUnion(userData.id),
      });
      return { followuserId, userId: userData.id };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "auth/unfollowUser",
  async (followuserId, { getState }) => {
    const userstate = getState();
    const userData = userstate.auth.user;
    try {
      const userDataRef = doc(db, "users", userData.id);
      const postRef = await updateDoc(userDataRef, {
        following: arrayRemove(followuserId),
      });
      const followerUserRef = doc(db, "users", followuserId);
      const followersUserRef = await updateDoc(followerUserRef, {
        followers: arrayRemove(userData.id),
      });
      return { followuserId, userId: userData.id };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "auth/updateUserDetails",
  async (userData, { getState }) => {
    const userstate = getState();
    const userId = userstate.auth.user.id;

    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, userData);
      const newUserData = await getDoc(userRef);
      return newUserData.data();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const getUserProfileDetails = createAsyncThunk(
  "auth/getUserProfileDetails",
  async (userId) => {
    console.log(userId);
    try {
      const userRef = doc(db, "users", userId);
      console.log(userRef);
      const userData = await getDoc(userRef);
      console.log(userData.id);
      return userData.data();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

const initialState = {
  isUserLoggedIn: false,
  user: {},
  otherUserDetails: {},
  users: [],
  error: null,
  signUpStatus: "idle",
  logInStatus: "idle",
  logOutStatus: "idle",
  getUserStatus: "idle",
  updateUserDetailsStatus: "idle",
  getUserDetailsStatus: "idle",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [SignUp.fulfilled]: (state, action) => {
      state.isUserLoggedIn = true;
      state.user = action.payload;
      state.signUpStatus = "succeed";
    },
    [SignUp.rejected]: (state, action) => {
      state.error = action.error.message;
      state.signUpStatus = "failed";
    },
    [SignUp.pending]: (state, action) => {
      state.signUpStatus = "loading";
    },
    [logIn.fulfilled]: (state, action) => {
      state.isUserLoggedIn = true;
      state.user = action.payload;
      state.logInStatus = "succeed";
    },
    [logIn.rejected]: (state, action) => {
      state.error = action.error.message;
      state.logInStatus = "failed";
    },
    [logIn.pending]: (state, action) => {
      state.logInStatus = "pending";
    },
    [logOut.fulfilled]: (state, action) => {
      state.isUserLoggedIn = false;
      state.logOutStatus = "succeed";
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.getUserStatus = "succeed";
    },
    [getAllUsers.rejected]: (state, action) => {
      state.error = action.error.message;
      state.getUserStatus = "failed";
    },
    [getAllUsers.pending]: (state, action) => {
      state.getUserStatus = "pending";
    },
    [followUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.user.following = state.user.following.concat(
        action.payload.followuserId
      );
      state.users = state.users.map((user) =>
        user.id === action.payload.followuserId
          ? { ...user, followers: [user.followers, action.payload.userId] }
          : user
      );
    },
    [unfollowUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.user = {
        ...state.user,
        following: state.user.following.filter(
          (id) => id !== action.payload.followuserId
        ),
      };
      state.users = state.users.map((user) =>
        user.id === action.payload.followuserId
          ? {
              ...user,
              followers: user.followers.filter(
                (id) => id !== action.payload.userId
              ),
            }
          : user
      );
    },
    [updateUserDetails.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.updateUserDetailsStatus = "succeed";
    },
    [updateUserDetails.pending]: (state, action) => {
      state.updateUserDetailsStatus = "loading";
    },
    [getUserProfileDetails.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.otherUserDetails = action.payload;
      state.getUserDetailsStatus = "succeed";
    },
    [getUserProfileDetails.pending]: (state) => {
      state.getUserDetailsStatus = "loading";
    },
  },
});
export default AuthSlice.reducer;
