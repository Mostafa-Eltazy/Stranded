import React from "react";
import RegistrationForm from "./RegistrationForm";

const LandingLayout = () => {
  return (
    <div className="container">
      <div className="col-md-12 flow d-flex flex-column align-items-center">
        <RegistrationForm/>
      </div>
    </div>
  );
};

export default LandingLayout;
