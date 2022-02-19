import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUserData } from "./LandingApi";
import { useForm } from "react-hook-form";
import RegistrationBar from "./RegistrationBar";

const RegistrationForm = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const nav = useNavigate();
  const handlFormSubmit = async () => {
    try {
      const { status } = await registerNewUserData(userData);
      if (status === 200) {
        nav("/island");
      }
    } catch (err) {
      console.log("Regestration Failed due to:", err);
    }
  };
  const navigateSteps = (step) => {
    if (
      currentIndex + step < React.Children.toArray(children).length &&
      currentIndex + step > -1
    ) {
      setCurrentIndex(currentIndex + step);
    }
  };
  useEffect(() => {
    console.log("the user data", userData);
  }, [userData]);

  return (
    <div className="landing-form  d-flex flex-column align-items-center justify-content-between w-100">
      <div className="d-flex flex-column align-items-center justify-content-between w-100">
        <h3 className="mb-5"> Join us</h3>
        <form className="w-75">
          <div className="d-flex flex-column">
            <RegistrationBar current_index={currentIndex} errors={errors} />
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                userData,
                setUserData,
                currentIndex,
                register,
                errors,
              });
            })}
          </div>
          <hr style={{ backgroundColor: "black", width: "100%" }} />
        </form>
        <div className="d-felx mb-2">
          <button
            className="stranded-button-icon-gray"
            onClick={() => navigateSteps(-1)}
          >
            {" "}
            <i class="fas fa-arrow-circle-left"></i>
          </button>
          <button
            className="stranded-button-icon-gray"
            onClick={() => navigateSteps(1)}
          >
            {" "}
            <i class="fas fa-arrow-circle-right"></i>
          </button>
        </div>
      </div>

      <button
        className="stranded-button"
        onClick={handleSubmit(handlFormSubmit)}
        // disabled={!isValid}
      >
        {" "}
        Register{" "}
      </button>
    </div>
  );
};

export default RegistrationForm;

export const StepOne = ({
  userData,
  setUserData,
  currentIndex,
  register,
  errors,
}) => {
  return (
    <>
      <div
        className={
          currentIndex === 0
            ? "d-flex flex-column  align-items-center justify-content-between mb-3"
            : "d-none"
        }
      >
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          name="first-name"
          id="first-name"
          defaultValue={userData?.fname || null}
          {...register("firstName", {
            required: { value: true, message: "First Name is a Requirment" },
            // pattern: {
            //   value: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
            //   message: "Invalid Syntax",
            // },
          })}
          placeholder="Input first name."
          onChange={(e) => setUserData({ ...userData, fname: e.target.value })}
        />
      </div>
      {errors.firstName && (
        <small
          className={
            currentIndex === 0
              ? "form-alert align-self-center mt-2 mb-3"
              : "d-none"
          }
        >
          <i className="fas fa-exclamation-triangle mr-2"></i>
          <span className="px-1">{errors.firstName.message}</span>
        </small>
      )}
      <div
        className={
          currentIndex === 0
            ? "d-flex flex-column  align-items-center justify-content-between mb-3"
            : "d-none"
        }
      >
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          name="last-name"
          id="last-name"
          defaultValue={userData?.lname || null}
          placeholder="Input last name."
          {...register("lastName", {
            required: { value: true, message: "Last Name is a Requirment" },
            // pattern: {
            //   value: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
            //   message: "Invalid Syntax",
            // },
          })}
          onChange={(e) => setUserData({ ...userData, lname: e.target.value })}
        />
      </div>
      {errors.lastName && (
        <small
          className={
            currentIndex === 0
              ? "form-alert align-self-center mt-2 mb-3"
              : "d-none"
          }
        >
          <i className="fas fa-exclamation-triangle mr-2"></i>
          <span className="px-1">{errors.lastName.message}</span>
        </small>
      )}
    </>
  );
};

export const StepTwo = ({
  userData,
  setUserData,
  currentIndex,
  register,
  errors,
}) => {
  const [hidden, isHidden] = useState(true);

  return (
    <>
      <div
        className={
          currentIndex === 1
            ? "d-flex flex-column  align-items-center justify-content-between mb-3"
            : "d-none"
        }
      >
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={userData?.email || null}
          placeholder="Input Email."
          {...register("email", {
            required: { value: true, message: "E-mail is a Requirment" },
            pattern: {
              value:
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
              message: "Invalid E-mail !",
            },
          })}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </div>
      {errors.email && (
        <small
          className={
            currentIndex === 1
              ? "form-alert align-self-center mt-2 mb-3"
              : "d-none"
          }
        >
          <i className="fas fa-exclamation-triangle mr-2"></i>
          <span className="px-1">{errors.email.message}</span>
        </small>
      )}
      <div
        className={
          currentIndex === 1
            ? "d-flex flex-column  align-items-center justify-content-between mb-3"
            : "d-none"
        }
      >
        <label htmlFor="password">Password</label>
        <input
          type={hidden ? "password" : "text"}
          name="password"
          id="password"
          placeholder="Input password."
          defaultValue={userData?.password || null}
          {...register("password", {
            required: { value: true, message: "Password is a Requirment" },
          })}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <label style={{ cursor: "pointer" }} htmlFor="eye">
          <i
            className={`${hidden ? "far fa-eye-slash" : "far fa-eye"} mt-2`}
          ></i>
        </label>
        <input
          type="checkbox"
          id="eye"
          onClick={() => {
            isHidden(!hidden);
          }}
          hidden={true}
        />
      </div>
      {errors.password && (
        <small
          className={
            currentIndex === 1
              ? "form-alert align-self-center mt-2 mb-3"
              : "d-none"
          }
        >
          <i className="fas fa-exclamation-triangle mr-2"></i>
          <span className="px-1">{errors.password.message}</span>
        </small>
      )}
    </>
  );
};

export const StepThree = ({
  userData,
  setUserData,
  currentIndex,
  register,
  errors,
}) => {
  return (
    <>
      <div
        className={
          currentIndex === 2
            ? "d-flex flex-column  align-items-center justify-content-between mb-3"
            : "d-none"
        }
      >
        <label htmlFor="user-name">User Name</label>
        <input
          type="text"
          name="user-name"
          id="user-name"
          placeholder="your user name."
          defaultValue={userData?.username || null}
          {...register("userName", {
            required: { value: true, message: "User Name is a Requirment" },
            // pattern: {
            //   value: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
            //   message: "Invalid UserName",
            // },
          })}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
      </div>
      {errors.userName && (
        <small
          className={
            currentIndex === 2
              ? "form-alert align-self-center mt-2 mb-3"
              : "d-none"
          }
        >
          <i className="fas fa-exclamation-triangle mr-2"></i>
          <span className="px-1">{errors.userName.message}</span>
        </small>
      )}
      <div
        className={
          currentIndex === 2
            ? "d-flex flex-column  align-items-center justify-content-between mb-3"
            : "d-none"
        }
      >
        <label htmlFor="profile-photo">
          Profile + Photo
          <input
            type="file"
            name="profile-photo"
            id="profile-photo"
            placeholder="please upload your profile photo."
            defaultValue={userData?.file || null}
            style={{ display: "none" }}
            onChange={(e) => setUserData({ ...userData, file: e.target.value })}
          />
        </label>
      </div>
    </>
  );
};
