import React from "react";
import HomeLayout from "../components/homeComponents/Homelayout";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <HomeLayout  />;
      </div>
      <Footer />
    </>
  );
};
export default Home;
