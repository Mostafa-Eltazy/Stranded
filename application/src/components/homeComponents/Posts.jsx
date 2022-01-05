import React from "react";
import PostCard from "./PostCard";

const Posts = ({ posts_list }) => {
  return (
    <>
      {posts_list?.map((post) => {
        return <PostCard post={post}/>
      })}
    </>
  );
};

export default Posts;
