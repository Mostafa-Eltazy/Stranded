import React from "react";
import { useState } from "react";
import axios from "axios";
import postSingleEntryData from "./singlePostApi"
const REACT_APP_API_BASEURL = `${process.env.REACT_APP_API_BASEURL}/posts`;

const EntryForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleFormSubmit =  (e) => {
    e.preventDefault();
    const entryData = {
      title:title,
      content:content,
      date: new Date().toISOString(),
      author_id:1,
    }
    postSingleEntryData(entryData);
  };
  console.log(new Date())
  return (
    <form className="entry-form">
      <label htmlFor="entry-title">
        {" "}
        Title
        <input
          type="text"
          id="entry-title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label htmlFor="entry-content">
        Content
        <textarea
          id="entry-content"
          onChange={(e) => setContent(e.target.value)}
        />
      </label>

      <button className="stranded-button" onClick={handleFormSubmit}>
        Dispatch !
      </button>
    </form>
  );
};

export default EntryForm;
