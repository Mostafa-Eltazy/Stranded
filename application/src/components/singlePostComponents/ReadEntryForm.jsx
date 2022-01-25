import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editSinglePostData } from "./singlePostApi";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDeleteSweep } from "react-icons/md";

const ReadEntryForm = ({ post_data }) => {
  const nav = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(post_data?.title || "");
  const [content, setContent] = useState(post_data?.content || "");

  const handleEdit = (e) => {
    e.preventDefault();
    if (editMode === true) {
      setTitle(post_data?.title);
      setContent(post_data?.content);
    }
    setEditMode((editMode) => !editMode);
  };
  const handleEditSubmit = async(e) => {
    e.preventDefault();
    const entryData = {
      
      post_id: post_data?.id,
      title,
      content,
      editDate: new Date().toISOString(),
    }
    try {
      const {status} = await editSinglePostData(entryData);
      if (status === 200 ){
        nav("/dispatch")
      }
    } catch(err){
      console.log("Post update Failed due to :", err)
    }
  };
  console.log(post_data?.id);
  console.log(content);
  return (
    <>
      <form className="entry-form d-flex flex-column">
        <div className="align-self-center align-self-md-end mb-4">
          <button
            className="stranded-button-icon-green"
            onClick={(e) => {
              handleEdit(e);
            }}
          >
            <RiEditLine />
          </button>
          <button
            className="stranded-button-icon-red"
            onClick={(e) => {
              handleEdit(e);
            }}
          >
            <MdOutlineDeleteSweep />
          </button>
        </div>
        {editMode && <label htmlFor="entry-title"> Title</label>}

        {editMode ? (
          <input
            type="text"
            id="entry-title"
            defaultValue={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <>
            <h3 className="align-self-center">{post_data.title}</h3>
            <hr />
          </>
        )}

        {editMode && <label htmlFor="entry-content">Content</label>}
        {editMode ? (
          <textarea
            id="entry-content"
            defaultValue={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        ) : (
          <p>{post_data.content}</p>
        )}
        {editMode ? (
          <button
            className="stranded-button w-25 align-self-center"
            onClick={handleEditSubmit}
            disabled={ post_data.title === title && post_data.content === content}
          >
            Submit updates
          </button>
        ) : null}
      </form>
    </>
  );
};

export default ReadEntryForm;
