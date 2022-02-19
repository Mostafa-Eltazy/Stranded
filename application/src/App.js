import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/style/App.scss";
import PrivateRoute from "./components/shared/PrivateRoute";
import { useUserContext } from "./components/UserData/Context";
import { actions } from "./components/UserData/Reducer";
import Accountpage from "./pages/Accountpage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SettingsPage from "./pages/SettingsPage";
import SinglePostPage from "./pages/SinglePostPage";
import { clearAuthToken, getAuthToken } from "./util/token-storage";

function App() {
  const { dispatch } = useUserContext();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getAuthToken();
        if (token) {
          const tokenPayload = JSON.parse(atob(token.split(".")[1]));
          const { username } = tokenPayload;
          const { data } = await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_BASEURL}/users/data`,
            data: {
              username: username,
            },
            headers: { "Content-Type": "application/json" },
          });

          dispatch({ type: actions.LOGIN_PASS, data });
        }
      } catch (err) {
        console.log(err, "user not present !");
        clearAuthToken();
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loadingUser) {
    return null;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route
            path="/dispatch"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/island"
            element={
              <PrivateRoute>
                <Accountpage />
              </PrivateRoute>
            }
          />
          <Route
            path="/entry"
            element={
              <PrivateRoute>
                <SinglePostPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/entry/:id"
            element={
              <PrivateRoute>
                <SinglePostPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
