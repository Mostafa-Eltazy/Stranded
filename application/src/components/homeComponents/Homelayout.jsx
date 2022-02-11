import React, { useEffect, useState } from "react";
import UserCard from "../shared/UserCard";
import { useUserContext } from "../UserData/Context";
import HomeApi from "./HomeApi";
import Pagination from "./Pagination";
import Posts from "./Posts";

const HomeLayout = () => {
  const { USER_Context_State, dispatch } = useUserContext();
  const [homePageData, sethomePageData] = useState(null);
  const navigateToPage = async (pageNumber, limit) => {
    const PageData = await HomeApi.getHomePageData(pageNumber, limit);
    sethomePageData(PageData)
  };
  useEffect(() => {
    (async () => {
      const homePageData = await HomeApi.getHomePageData(1, 3);
      sethomePageData(homePageData);
    })();
  }, []);
  useEffect(() => {
    console.log("from the posts page", USER_Context_State);
  }, [USER_Context_State]);
  return (
    <>
      <div className="container">
        <div className="row mt-4 ">
          <div className="col-md-9 flow d-flex flex-column align-items-center main-column">
            <Posts posts_list={homePageData?.posts} />
            <Pagination
              total_posts={homePageData?.totalPosts}
              limit={homePageData?.limit}
              page_number={Number(homePageData?.page)}
              navigate_to_page={navigateToPage}
            />
          </div>
          {USER_Context_State?.user?.user ? (
            <div
              className="col-md-3 flow mt-4 mt-md-0"
              // style={{ backgroundColor: "silver" }}
            >
              <UserCard />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
