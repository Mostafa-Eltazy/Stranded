import React from "react";
import Posts from "./Posts";

const HomeLayout = ({ home_page_data }) => {
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-9 flow d-flex flex-column align-items-center main-column">
            <Posts posts_list={home_page_data?.posts} />
          </div>
          <div className="col-md-3 flow mt-4 mt-md-0">left column</div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
