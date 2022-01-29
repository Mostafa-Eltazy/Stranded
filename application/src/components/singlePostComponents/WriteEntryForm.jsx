import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { postSingleEntryData } from "./singlePostApi";
import { useUserContext } from "../UserData/Context";


const WriteEntryForm = () => {
  const { USER_Context_State, dispatch } = useUserContext();

  useEffect(()=>{
    console.log("from entry page", USER_Context_State)
  },[USER_Context_State])



  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const nav = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const entryData = {
      title: title,
      content: content,
      date: new Date().toISOString(),
      author_id: USER_Context_State?.user?.user.id,
    };
    try {
      const { status } = await postSingleEntryData(entryData);
      if (status === 200) {
        nav("/dispatch");
      }
    } catch (err) {
      console.log("the post has not been submitted");
    }
  };

  return (
    <form className="entry-form d-flex flex-column">
      <label htmlFor="entry-title"> Title</label>
      <input
        type="text"
        id="entry-title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="entry-content">Content</label>
      <textarea
        id="entry-content"
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="stranded-button w-25" onClick={handleFormSubmit}>
        Dispatch !
      </button>
    </form>
  );
};

export default WriteEntryForm;
