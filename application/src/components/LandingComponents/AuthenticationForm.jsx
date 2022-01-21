import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authinticateUser } from "./LandingApi";
import { useUserContext } from "../UserData/Context";
import { actions } from "../UserData/Reducer";

const AuthenticationForm = () => {
  const [authData, setAuthData] = useState({});
  const { USER_Context_State, dispatch } = useUserContext();

  useEffect(() => {
    console.log("User context state", USER_Context_State);
  }, [USER_Context_State]);
  const nav = useNavigate();
  const handleFormSubmit = async () => {
    try {
      dispatch({ type: actions.LOGIN_START });
      const { status, data } = await authinticateUser(authData);
      if (status === 200) {
        // localStorage.setItem("user_data", JSON.stringify(data));
        dispatch({ type: actions.LOGIN_PASS, data });
        nav("/dispatch");
      }
    } catch (err) {
      dispatch({ type: actions.LOGIN_FAIL });
      console.log("Authintication Failed due to:", err);
    }
  };
  return (
    <div className="landing-form  d-flex flex-column align-items-center justify-content-between w-100">
      <div className="d-flex flex-column align-items-center justify-content-between w-100 h-50">
        <h3 className="mb-5"> Already a member </h3>
        <form>
          <label htmlFor="email">
            E-mail
            <input
              type="email"
              name="email"
              id="email"
              placeholder="please type your email."
              onChange={(e) =>
                setAuthData({ ...authData, email: e.target.value })
              }
            ></input>
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              id="password"
              placeholder="please type your password."
              onChange={(e) =>
                setAuthData({ ...authData, password: e.target.value })
              }
            ></input>
          </label>
        </form>
      </div>
      <button className="stranded-button" onClick={handleFormSubmit}>
        {" "}
        Log in{" "}
      </button>
    </div>
  );
};

export default AuthenticationForm;
