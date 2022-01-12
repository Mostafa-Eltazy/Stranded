import "../src/style/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Accountpage from "./pages/Accountpage";
import SinglePost from "./pages/SinglePost";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/dispatch" element={<HomePage />} />
          <Route path="/island" element={<Accountpage />} />
          <Route path="/entry" element={<SinglePost />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
