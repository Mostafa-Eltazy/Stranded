import React from "react";
import Posts from "./Posts";
import UserCard from "../shared/UserCard";
import { useEffect } from "react";
import { useUserContext } from "../UserData/Context";

const HomeLayout = ({ home_page_data }) => {
  const { USER_Context_State, dispatch } = useUserContext();
  useEffect(() => {
    console.log("from the posts page", USER_Context_State);
  }, [USER_Context_State]);

  return (
    <>
      <div className="container">
        <div className="row mt-4 ">
          <div className="col-md-9 flow d-flex flex-column align-items-center main-column">
            <Posts posts_list={home_page_data?.posts} />
          </div>
          <div
            className="col-md-3 flow mt-4 mt-md-0"
            // style={{ backgroundColor: "silver" }}
          >
            <UserCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
