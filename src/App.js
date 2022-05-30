import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  MyFeedPage,
  Home,
  LoginPage,
  SignUpPage,
  ProfilePage,
  BookmarkPage,
  ExplorePage,
  SearchPage,
} from "./Pages";
import { getCurrentUser } from "./redux/AuthSlice/AuthSlice";
import { RequiresAuth } from "./Components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/my-feed"
          element={
            <RequiresAuth>
              <MyFeedPage />
            </RequiresAuth>
          }
        />
        <Route
          path="/explore"
          element={
            <RequiresAuth>
              <ExplorePage />
            </RequiresAuth>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <RequiresAuth>
              <ProfilePage />
            </RequiresAuth>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <RequiresAuth>
              <BookmarkPage />
            </RequiresAuth>
          }
        />
        <Route
          path="/search"
          element={
            <RequiresAuth>
              <SearchPage />
            </RequiresAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
