import React from "react";
import moment from "moment";

const PostCard = ({ post }) => {
  return (
    <div className="post-card mb-3">
      <div className="d-flex justify-content-start p-3">
        <div>
          <img
            src={
              "https://cdn.pixabay.com/photo/2017/09/06/08/17/magnetic-island-2720606_1280.jpg"
            }
          />
          <div className="d-flex flex-column mt-1">
            <span>{post.author.username}</span>
            {moment(post.date.split("T")[0], "YYYY/MM/DD")
              .startOf("day")
              .fromNow()
              .split(" ")[1] === "days" ? (
              <span>
                {moment(post.date.split("T")[0], "YYYY/MM/DD").format(
                  "MMM Do YYYY"
                )}
              </span>
            ) : (
              <span>
                {moment(post.date.split("T")[0], "YYYY/MM/DD")
                  .startOf("day")
                  .fromNow()}
              </span>
            )}
          </div>
        </div>
        <div className="d-flex flex-column  mt-1 mx-2">
          <h6>{post.title}</h6>
          { post.title && <hr className="my-1" />}
          <p className="text-wrap">
            {post.content} Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Provident officiis iure ab quam earum ducimus nobis cupiditate
            recusandae ratione? Tenetur dicta asperiores expedita, soluta
            molestias sequi porro accusamus pariatur fugit. Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Enim nemo, modi nihil soluta
            praesentium, maxime ipsam voluptate quisquam quia facere natus ipsa
            voluptates perspiciatis quas harum. Autem maxime quaerat natus?{" "}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident
            officiis iure ab quam earum ducimus nobis cupiditate recusandae
            ratione? Tenetur dicta asperiores expedita, soluta molestias sequi
            porro accusamus pariatur fugit. Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Enim nemo, modi nihil soluta
            praesentium, maxime ipsam voluptate quisquam quia facere natus ipsa
            voluptates perspiciatis quas harum. Autem maxime quaerat natus?{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
