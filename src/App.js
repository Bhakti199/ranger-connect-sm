import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MyFeedPage } from "./Pages";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MyFeedPage />} />
      </Routes>
    </div>
  );
}

export default App;
