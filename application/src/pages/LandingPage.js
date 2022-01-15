import React from "react";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import LandingLayout from "../components/LandingComponents/LandingLayout";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="page-wrapper">
        <LandingLayout />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
