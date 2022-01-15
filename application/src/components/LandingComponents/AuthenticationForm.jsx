import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {authinticateUser} from "./LandingApi"

const AuthenticationForm = () => {
    const [authData, setAuthData] = useState({});
    const nav = useNavigate()
    const handleFormSubmit = async () => {
        console.log(authData)
        try {

            const {status,data} = await authinticateUser(authData) 
            if( status === 200)
            {
                localStorage.setItem("user_data", JSON.stringify(data));
                nav("/dispatch")
                
            }
          
        } catch (err){
            console.log("Authintication Failed due to:", err)
        }
    }

  return (
    <div className="registration-form col-md-5 d-flex flex-column align-items-center justify-content-between">
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
      <button className="stranded-button" onClick={handleFormSubmit}> Log in </button>
    </div>
  );
};

export default AuthenticationForm;
