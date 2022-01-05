import React from "react";

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
            <span>from: user</span> <span>at : date</span>
          </div>
        </div>
        <div className="d-flex flex-column  mt-1">
          <h6>{post.title}</h6>
          <hr className="my-1" />
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
