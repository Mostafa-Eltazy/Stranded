import React from "react";
import { useState } from "react";
import axios from "axios";
// import postSingleEntryData from "singlePostApi"
const REACT_APP_API_BASEURL = `${process.env.REACT_APP_API_BASEURL}/posts`;

const EntryForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("content", content);
    data.append("date", new Date().toDateString());
    data.append("author_id", 1);
    axios({
      method: "post",
      url: `${REACT_APP_API_BASEURL}/add`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  // const handleEdit = async () => {
  //   try {
  //     await axios.put(`/posts/${_id}`, {
  //       username: user.username,
  //       title: newtitle,
  //       description: newdescription,
  //     });
  //     window.location.reload();
  //   } catch (err) {
  //     console.log("Failed to Edit Post from FE");
  //     console.log(err);
  //   }
  // };
  console.log(new Date().toISOString())
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
