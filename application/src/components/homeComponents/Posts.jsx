import React from "react";
import PostCard from "./PostCard";

const Posts = ({ posts_list }) => {
  return (
    <>
      {posts_list?.sort((p1, p2)=>{
       return new Date(p2.date) - new Date(p1.date)
      }).map((post) => {
        return <PostCard key={post.id} post={post}/>
      })}
    </>
  );
};

export default Posts;
