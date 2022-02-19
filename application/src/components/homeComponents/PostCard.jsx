import React from "react";
import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useUserContext } from "../UserData/Context";
import { deleteSingleEntryData } from "../singlePostComponents/singlePostApi";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";



const PostCard = ({ post }) => {
  const { USER_Context_State, dispatch } = useUserContext();
  // Page Navigator
  const nav = useNavigate();
  // modal state variables
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleDelete = async () => {
    try {
      const { status } = await deleteSingleEntryData(post?.id);
      if (status === 204) {
        setShow(false);
        window.location.reload();

      }
    } catch (err) {
      console.log("something went wrong while deleting the post");
    }
  };
  const handleEdit = (e)=>{
    e.preventDefault();
    nav({
      pathname: `/entry/${post.id}`,
      search: '?edit=true'
    })

  }

  return (
    <>
      <Modal className="stranded-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton className="stranded-modal__header">
          <Modal.Title>Delete confirmation message</Modal.Title>
        </Modal.Header>
        <Modal.Body className="stranded-modal__body">
          Are you Certain you want to delete the Entry,{" "}
          {post?.author?.username} ?!
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
      <div className="post-card mb-3">
        <div className="d-flex justify-content-start p-3">
          <div>
            <img
              src={
                "https://cdn.pixabay.com/photo/2017/09/06/08/17/magnetic-island-2720606_1280.jpg"
              }
            />
            <div className="d-flex flex-column mt-1">
              <span>{post.author.username}</span>
              {moment(
                (post.isEdited ? post.editDate : post.date).split("T")[0],
                "YYYY/MM/DD"
              )
                .startOf("day")
                .fromNow()
                .split(" ")[1] === "days" ? (
                <span>
                  {moment(
                    (post.isEdited ? post.editDate : post.date).split("T")[0],
                    "YYYY/MM/DD"
                  ).format("MMM Do YYYY")}
                </span>
              ) : (
                <span>
                  {moment(
                    (post.isEdited ? post.editDate : post.date).split("T")[0],
                    "YYYY/MM/DD"
                  )
                    .startOf("day")
                    .fromNow()}
                </span>
              )}
              {post.isEdited && <span>Edited</span>}
            </div>
          </div>
          <div className="d-flex flex-column  mt-1 mx-2 w-100">
            <h6 className="d-flex align-items-center justify-content-between mb-0">
              <Link
                to={`/entry/${post.id}`}
                style={{ textDecoration: "none", color: "#000" }}
              >
                {post.title}
              </Link>
              {USER_Context_State?.user?.user.id === post?.author?.id ? (
                <div className="align-self-center align-self-md-end mb-1">
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
            </h6>
            {post.title && <hr className="my-1" />}
            <p className="">
              {post.content} 
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
