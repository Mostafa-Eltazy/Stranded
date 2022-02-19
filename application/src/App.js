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
          console.log(
            "xx",
            JSON.parse(
              atob(
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NDUyMDE3NTEsImV4cCI6MTY0NTIwNTM1MSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiciJ9.BomyMZ9zxAUNIUYqt2E3n7VJncD9fBV1B9V_boJliO3UedkopsxRTX_MTcCPIbwV47brLEoHZHZOVfyEUOkR6SgZjslsXC0emuuZ-2NBpQeN7A_4u6sEbD2hsI0UtN1aA05Iry0tOuvyqOCcjMX_oKoFy7zq-Fsht0zUpMa4mwTySB5TrJQ1iUzuH9HAMdjN8xk58BqBqkK7nY0Mx3NQu2CCLZvBUkKkdeOrMb56uDyc3vrpeu2uLnKX6DtTHHo-j7ALU9BVtI3aoqLVhMRtu6FoQNJkctxR3NROYJB5NkD0Jw1AA0FvcFdCp3VNNUOP28lOcjmmHidB_dPJn9PgGg".split(
                  "."
                )[1]
              )
            )
          );
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
              // <PrivateRoute>
              <SinglePostPage />
              // </PrivateRoute>
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
