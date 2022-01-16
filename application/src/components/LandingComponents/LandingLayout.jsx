import React from "react";
import AuthenticationForm from "./AuthenticationForm";
import Forms from "./Forms";
import LandingIntro from "./LandingIntro";
import RegistrationForm from "./RegistrationForm";

const LandingLayout = () => {
  return (
    <div className="container">
      <div className="col-md-12 flow d-md-flex justify-content-between">
        <LandingIntro />
        <Forms />
      </div>
    </div>
  );
};

export default LandingLayout;
