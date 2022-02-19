import React from "react";
import ReadEntryForm from "./ReadEntryForm";
import { useEffect, useState } from "react";
import { getSingleEntryData } from "../singlePostComponents/singlePostApi";

const ExistantPostLayout = ({ post_id }) => {
  const [postData, setPostData] = useState();
  useEffect(() => {
    const fetchPost = async (post_id) => {
      const reqData = await getSingleEntryData(post_id);
      const { data } = reqData;
      setPostData(data);
    };
    try {
      fetchPost(post_id);
    } catch (err) {
      console.log("faild due to :", err);
    }
  }, [post_id]);
  console.log("qqqqqqqqqqqqqqqqqqqqqq",postData);
  return (
    <div>
      <>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-9 flow d-flex flex-column align-items-center main-column">
              {postData?.post ? (
                <ReadEntryForm post_data={postData?.post} />
              ) : null}
            </div>
            <div className="col-md-3 flow mt-4 mt-md-0">left oo column</div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ExistantPostLayout;
