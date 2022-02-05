import React from "react";
import { useState, useEffect } from "react";

const Pagination = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const setPage = (offset) => {
    setPageNumber(pageNumber + offset);
  };
  console.log(pageNumber);
  useEffect(() => {}, []);
  return (
    <div className="d-flex flex-column align-items-center">
      <ul className="pagination-list ">
        <li className={pageNumber === 1 ? "active" : ""}>1</li>
        <li className={pageNumber === 2 ? "active" : ""}>2</li>
        <li className={pageNumber === 3 ? "active" : ""}>3</li>
      </ul>
      <div className="d-felx mb-2 ">
        <button
          className="stranded-button-icon-gray"
          onClick={() => setPage(-1)}
        >
          {" "}
          <i class="fas fa-arrow-circle-left"></i>
        </button>
        <button
          className="stranded-button-icon-gray"
          onClick={() => setPage(1)}
        >
          {" "}
          <i class="fas fa-arrow-circle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
