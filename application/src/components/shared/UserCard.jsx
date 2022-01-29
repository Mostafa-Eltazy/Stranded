import React from "react";
import CreateEntryButton from "./CreateEntryButton";
import { Link } from "react-router-dom";
import { useUserContext } from "../UserData/Context";
const UserCard = () => {
  const { USER_Context_State, dispatch } = useUserContext();

  return (
    <div>
      <div className="user-card d-flex flex-column align-items-center">
        <h4> Welcome Back, {USER_Context_State?.user?.user.username}</h4>
        <Link
          to={`/island`}
          className="mb-3"
          style={{ textDecoration: "none", color: "#000" }}
        >
          <img
            src={
              "https://cdn.pixabay.com/photo/2017/09/06/08/17/magnetic-island-2720606_1280.jpg"
            }
          />
        </Link>

        <CreateEntryButton />
      </div>
    </div>
  );
};

export default UserCard;
