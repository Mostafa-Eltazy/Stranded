import React from "react";

const RegistrationBar = ({ current_index, errors }) => {
  return (
    <div className="reg-bar d-flex justify-content-around mb-2">
      <span
        className={
          current_index > 0
            ? errors.firstName && errors.lastName
              ? "missing"
              : "active"
            : ""
        }
      >
        1
      </span>

      <hr
        className={
          current_index > 0
            ? errors.firstName && errors.lastName
              ? "missing"
              : "active"
            : ""
        }
      />
      <span
        className={
          current_index > 1
            ? errors.email && errors.password
              ? "missing"
              : "active"
            : ""
        }
      >
        2
      </span>
      <hr
        className={
          current_index > 1
            ? errors.email && errors.password
              ? "missing"
              : "active"
            : ""
        }
      />
      <span
      //   className={
      //       current_index > 1
      //         ? errors.userName
      //           ? "missing"
      //           : "active"
      //         : ""
      //     }
      >
        3
      </span>
    </div>
  );
};

export default RegistrationBar;
