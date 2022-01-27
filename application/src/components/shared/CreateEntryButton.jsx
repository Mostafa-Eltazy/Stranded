import React from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";

const CreateEntryButton = () => {
  return (
    <button className="create-entry-btn d-flex align-items-center justify-content-center w-100 mb-2">
      <Link to="/entry" className="w-100" style={{ textDecoration: "none", color: "#000" }}>
      <i className="far fa-edit create-entry-btn__icon"></i>
        <span>
            Make an Entry
            </span>
      </Link>
    </button>
  );
};

export default CreateEntryButton;
