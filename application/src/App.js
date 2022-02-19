import axios from "axios";
import { useEffect } from "react";
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import "../src/style/App.scss";
import { useToken } from "./components/CustomHooks/useToken";
import PrivateRoute from "./components/shared/PrivateRoute";
import { useUserContext } from "./components/UserData/Context";
import { actions } from "./components/UserData/Reducer";
import Accountpage from "./pages/Accountpage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SettingsPage from "./pages/SettingsPage";
import SinglePostPage from "./pages/SinglePostPage";

function App() {
  const { USER_Context_State, dispatch } = useUserContext();
  const [token] = useToken();
  useEffect(() => {
    const fetchUser = async () => {
      const toeknPayload = JSON.parse(atob(token.split(".")[1]));
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
      const { username } = toeknPayload;
      try {
        const { status, data } = await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_BASEURL}/users/data`,
          data: {
            username: username,
          },
          headers: { "Content-Type": "application/json" },
        });
        if (status === 200) {
          dispatch({ type: actions.LOGIN_PASS, data });
        }
      } catch (err) {
        console.log(err, "user not present !");
      }
    };
    if (token) {
      fetchUser();
    }
  }, [token]);
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
