import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MyFeedPage, Home, LoginPage, SignUpPage, ProfilePage } from "./Pages";
import { RequiresAuth } from "./Components";
function App() {
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
          path="/profile"
          element={
            <RequiresAuth>
              <ProfilePage />
            </RequiresAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
