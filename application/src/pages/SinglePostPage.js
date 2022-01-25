import React from "react";

import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import EmptyPostLayout from "../components/singlePostComponents/EmptyPostLayout";
import ExistantPostLayout from "../components/singlePostComponents/ExistantPostLayout";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const SinglePostPage = () => {
  const { id } = useParams();

  console.log(id);

  return (
    <div>
      <Header />
      <div className="page-wrapper">
        {id ? <ExistantPostLayout post_id={id} /> : <EmptyPostLayout />}
      </div>
      <Footer />
    </div>
  );
};

export default SinglePostPage;
