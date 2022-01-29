import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUserData } from "./LandingApi";

const RegistrationForm = () => {
  const [userData, setUserData] = useState({});
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

  return (
    <div className="landing-form  d-flex flex-column align-items-center justify-content-between w-100">
      <div className="d-flex flex-column align-items-center justify-content-between w-100">
        <h3 className="mb-5"> Join us</h3>
        <form className="w-75">
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-3">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              placeholder="please type your first name."
              onChange={(e) =>
                setUserData({ ...userData, fname: e.target.value })
              }
            />
          </div>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-3">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              placeholder="please type your last name."
              onChange={(e) =>
                setUserData({ ...userData, lname: e.target.value })
              }
            />
          </div>
          <hr style={{ backgroundColor: "black", width: "100%" }} />
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-3">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="please type your email."
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-3">
            <label htmlFor="passwword">Password</label>
            <input
              type="passwword"
              name="passwword"
              id="passwword"
              placeholder="please type your password."
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
          <hr style={{ backgroundColor: "black", width: "100%" }} />
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-3">
            <label htmlFor="user-name">User Name</label>
            <input
              type="text"
              name="user-name"
              id="user-name"
              placeholder="please type your user name."
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
          </div>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-3">
            <label htmlFor="profile-photo">
              Profile + Photo
              <input
                type="file"
                name="profile-photo"
                id="profile-photo"
                placeholder="please upload your profile photo."
                style={{ display: "none" }}
                onChange={(e) =>
                  setUserData({ ...userData, file: e.target.value })
                }
              />
            </label>
          </div>
        </form>
      </div>
      <button className="stranded-button" onClick={handlFormSubmit}>
        {" "}
        Register{" "}
      </button>
    </div>
  );
};

export default RegistrationForm;
