import React from "react";
import { useReducer, useState } from "react";
import RegistrationForm from "./RegistrationForm";
import AuthenticationForm from "./AuthenticationForm";

const Forms = () => {
  const [change, setChange] = useState(true);
  console.log(change);
  return (
    <div className="col-md-5 container landing-form m-0">
      <div className="toggler-container d-flex justify-content-around w-100 mb-4">
        <button
          className={`${change ? "toggler-btn-active" : "toggler-btn"}`}
          value={change}
          onClick={() => setChange(true)}
        >
          {" "}
          Log in
        </button>
        <button
          className={`${change ? "toggler-btn" : "toggler-btn-active"}`}
          value={change}
          onClick={() => setChange(false)}
        >
          {" "}
          Register{" "}
        </button>
      </div>
      {change ? <AuthenticationForm /> : <RegistrationForm />}
    </div>
  );
};

export default Forms;
