import React, { useState, useEffect } from "react";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import HomeApi from "../components/homeComponents/HomeApi";
import HomeLayout from "../components/homeComponents/Homelayout";

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getHomePageData = async () => {
      const homePageData = await HomeApi.getHomePageData();
      setData(homePageData);
    };
    getHomePageData();
  }, []);
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <HomeLayout home_page_data={data} />;
      </div>
      <Footer />
    </>
  );
};
export default Home;
