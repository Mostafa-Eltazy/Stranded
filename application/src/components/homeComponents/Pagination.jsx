import React from "react";

const Pagination = ({ total_posts, limit, navigate_to_page, page_number }) => {
  const numberOfPages = Math.ceil(total_posts / limit);
  const pages = Array.from(Array(numberOfPages || null).keys());
  const setPage = (offset) => {
    if (page_number + offset > numberOfPages || page_number + offset < 1) {
    } else {
      navigate_to_page(page_number + offset, limit);
    }
  };
  const navToPage = (page_number) => {
    navigate_to_page(page_number, limit);
  };
  console.log("xxx", limit);
  return (
    <div className="d-flex flex-column align-items-center">
      <ul className="pagination-list ">
        {page_number > 2 && (
          <li
            className={"holder"}
            onClick={() => navToPage(1)}
            style={{ cursor: "pointer" }}
          >
            First
          </li>
        )}

        {pages
          .map((page) => {
            return (
              <li
                key={page}
                className={page_number === page + 1 ? "active" : ""}
                onClick={() => navToPage(page + 1)}
                style={{ cursor: "pointer" }}
              >
                {page + 1}
              </li>
            );
          })
          .slice(
            page_number > 2
              ? page_number === pages.length
                ? page_number - 3
                : page_number - 2
              : 0,
            page_number > 1 ? page_number + 1 : page_number + 2
          )}
        {page_number < numberOfPages - 1 && (
          <li
            className={"holder"}
            onClick={() => navToPage(pages.length)}
            style={{ cursor: "pointer" }}
          >
            Last
          </li>
        )}
      </ul>
      <div className="d-felx mb-2 ">
        <button
          className="stranded-button-icon-gray"
          onClick={() => setPage(-1)}
        >
          {" "}
          <i className="fas fa-arrow-circle-left"></i>
        </button>
        <button
          className="stranded-button-icon-gray"
          onClick={() => setPage(1)}
        >
          {" "}
          <i className="fas fa-arrow-circle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
