import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Header";
import HomeApi from "../../components/homeComponents/HomeApi";
import HomeLayout from "../../components/homeComponents/Homelayout";

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getHomePageData = async () => {
      const homePageData = await HomeApi.getHomePageData();
      setData(homePageData);
    };
    getHomePageData();
  }, []);
  console.log("xxx", data);
  return (
    <>
      <Header/>
      <HomeLayout home_page_data={data} />;
    </>
  );
};
export default Home;
