import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authinticateUser } from "./LandingApi";
import { useUserContext } from "../UserData/Context";
import { actions } from "../UserData/Reducer";
import { useForm } from "react-hook-form";

const AuthenticationForm = () => {
  const [authData, setAuthData] = useState({});
  const [hidden, isHidden] = useState(true);
  const { USER_Context_State, dispatch } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        <form className="w-75">
          <div className="d-flex flex-column">
            <div className="d-flex flex-column align-items-center justify-content-between mb-3">
              <label className="mb-2" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="please type your email."
                {...register("email", {
                  required: { value: true, message: "E-mail is a requirment." },
                  pattern: {
                    value:
                      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                    message: "Invalid E-mail !",
                  },
                })}
                onChange={(e) =>
                  setAuthData({ ...authData, email: e.target.value })
                }
              />
            </div>
            {errors.email && (
              <small className="form-alert align-self-center mt-2 mb-3">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                <span className="px-1">{errors.email.message}</span>
              </small>
            )}
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex flex-column align-items-center justify-content-between mb-3">
              <label className="mb-2" htmlFor="password">
                Password
              </label>
              <input
                type={hidden ? "password" : "text"}
                name="password"
                id="password"
                placeholder="please type your password."
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is a requirment",
                  },
                })}
                onChange={(e) =>
                  setAuthData({ ...authData, password: e.target.value })
                }
              />
              <label htmlFor="eye">
                <i
                  className={`${
                    hidden ? "far fa-eye-slash" : "far fa-eye"
                  } mt-2`}
                ></i>
              </label>
              <input
                type="checkbox"
                id="eye"
                onClick={() => {
                  isHidden(!hidden);
                }}
                hidden="true"
              />
            </div>
            {errors.password && (
              <small className="form-alert align-self-center mt-2 mb-3">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                <span className="px-1">{errors.password.message}</span>
              </small>
            )}
          </div>
        </form>
      </div>
      <button
        className="stranded-button"
        onClick={handleSubmit(handleFormSubmit)}
      >
        {" "}
        Log in{" "}
      </button>
    </div>
  );
};

export default AuthenticationForm;
