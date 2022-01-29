import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteSingleEntryData, editSinglePostData } from "./singlePostApi";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useUserContext } from "../UserData/Context";


const ReadEntryForm = ({ post_data }) => {
  const { USER_Context_State, dispatch } = useUserContext();

  useEffect(() => {
    console.log("from Read&edit form page", USER_Context_State);
  }, [USER_Context_State]);

  // Page Navigator
  const nav = useNavigate();
  const search = window.location.search;
  const [,x] = search.split('=')
  console.log((x === 'true'))
  // edit state variables
  const [editMode, setEditMode] = useState(false || (x === 'true'));
  const [title, setTitle] = useState(post_data?.title || "");
  const [content, setContent] = useState(post_data?.content || "");
  // modal state variables
  const [show, setShow] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    if (editMode === true) {
      setTitle(post_data?.title);
      setContent(post_data?.content);
    }
    setEditMode((editMode) => !editMode);
  };
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const entryData = {
      post_id: post_data?.id,
      title,
      content,
      editDate: new Date().toISOString(),
    };
    try {
      const { status } = await editSinglePostData(entryData);
      if (status === 200) {
        nav("/dispatch");
      }
    } catch (err) {
      console.log("Post update Failed due to :", err);
    }
  };

  const handleDelete = async () => {
    try {
      const { status } = await deleteSingleEntryData(post_data.id);
      if (status === 204) {
        nav("/dispatch");
      }
    } catch (err) {
      console.log("something went wrong while deleting the post");
    }
  };
  return (
    <>
      <Modal className="stranded-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton className="stranded-modal__header">
          <Modal.Title>Delete confirmation message</Modal.Title>
        </Modal.Header>
        <Modal.Body className="stranded-modal__body">
          Are you Certain you want to delete the Entry,{" "}
          {post_data?.author?.username} ?!
        </Modal.Body>
        <Modal.Footer className="stranded-modal__footer">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Entry
          </Button>
        </Modal.Footer>
      </Modal>
      <form className="entry-form d-flex flex-column">
        {USER_Context_State?.user?.user.id === post_data?.author?.id ? (
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
                handleShow(e);
              }}
            >
              <MdOutlineDeleteSweep />
            </button>
          </div>
        ) : null}
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
            disabled={
              post_data.title === title && post_data.content === content
            }
          >
            Submit updates
          </button>
        ) : null}
      </form>
    </>
  );
};

export default ReadEntryForm;
