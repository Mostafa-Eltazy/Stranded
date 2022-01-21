import React from "react";
import Forms from "./Forms";
import LandingIntro from "./LandingIntro";
import { UserContextProvider } from "../UserData/Context";



const LandingLayout = () => {
  
  return (
    <div className="container">
      <div className="col-md-12 flow d-md-flex justify-content-between">
        <LandingIntro />
        <UserContextProvider>
          <Forms />
        </UserContextProvider>
      </div>
    </div>
  );
};

export default LandingLayout;
