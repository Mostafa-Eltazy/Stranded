import React from "react";
import EntryForm from "./EntryForm";

const SinglePostLayout = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-9 flow d-flex flex-column align-items-center main-column">
           <EntryForm className="mt-2"/>
          </div>
          <div className="col-md-3 flow mt-4 mt-md-0">left column</div>
        </div>
      </div>
    </>
  );
};

export default SinglePostLayout;
