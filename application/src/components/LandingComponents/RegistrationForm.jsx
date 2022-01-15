import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {registerNewUserData} from "./LandingApi"

const RegistrationForm = () => {
  const [userData, setUserData] = useState({});
  const nav = useNavigate()
  const handlFormSubmit = async()=>{
    try {
        const {status} = await registerNewUserData(userData);
        if (status === 200) {
            nav("/island");
          }
    } catch (err){
        console.log("Regestration Failed due to:", err)
    }
  }
  
  return (
    <div className="registration-form col-md-5 d-flex flex-column align-items-center">
      <h3 className="mb-5"> Join us</h3>
      <form>
        <label htmlFor="first-name">
          First Name
          <input
            type="text"
            name="first-name"
            id="first-name"
            placeholder="please type your first name."
            onChange={(e) =>
              setUserData({ ...userData, fname: e.target.value })
            }
          ></input>
        </label>
        <label htmlFor="last-name">
          Last Name
          <input
            type="text"
            name="last-name"
            id="last-name"
            placeholder="please type your last name."
            onChange={(e) =>
              setUserData({ ...userData, lname: e.target.value })
            }
          ></input>
        </label>
        <hr style={{ backgroundColor: "black", width: "100%" }} />
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            name="email"
            id="email"
            placeholder="please type your email."
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          ></input>
        </label>
        <label htmlFor="passwword">
          Password
          <input
            type="passwword"
            name="passwword"
            id="passwword"
            placeholder="please type your password."
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          ></input>
        </label>
        <hr style={{ backgroundColor: "black", width: "100%" }} />
        <label htmlFor="user-name">
          User Name
          <input
            type="text"
            name="user-name"
            id="user-name"
            placeholder="please type your user name."
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          ></input>
        </label>
        <label htmlFor="profile-photo">
          Profile + Photo
          <input
            type="file"
            name="profile-photo"
            id="profile-photo"
            placeholder="please upload your profile photo."
            style={{ display: "none" }}
            onChange={(e) => setUserData({ ...userData, file: e.target.value })}
          />
        </label>
      </form>
      <button className="stranded-button" onClick={handlFormSubmit}> Register </button>
    </div>
  );
};

export default RegistrationForm;
