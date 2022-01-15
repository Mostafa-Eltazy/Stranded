import React from "react";
import AuthenticationForm from "./AuthenticationForm";
import RegistrationForm from "./RegistrationForm";

const LandingLayout = () => {
  return (
    <div className="container">
      <div className="col-md-12 flow d-flex justify-content-between">
        <RegistrationForm/>
        <AuthenticationForm/>
      </div>
    </div>
  );
};

export default LandingLayout;
