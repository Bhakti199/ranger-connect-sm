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

const initialState = {
  isUserLoggedIn: false,
  user: {},
  users: [],
  error: null,
  signUpStatus: "idle",
  logInStatus: "idle",
  logOutStatus: "idle",
  getUserStatus: "idle",
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
  },
});
export default AuthSlice.reducer;
