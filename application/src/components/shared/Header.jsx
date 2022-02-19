import React, { useState } from "react";
import { BiRadio } from "react-icons/bi";
import { GiIsland } from "react-icons/gi";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useUserContext } from "../UserData/Context";
import { actions } from "../UserData/Reducer";

const Header = () => {
  const { USER_Context_State, dispatch } = useUserContext();
  const [active, setActive] = useState(
    USER_Context_State?.user
      ? window.location.pathname?.split("/")[1]
      : window.location.pathname?.split("/")[1] === "dispatch"
      ? ""
      : "arrival"
  );

  const setToActive = (dir) => {
    setActive(dir);
  };
  const handelLogout = (e) => {
    // e.preventDefault()
    setToActive("departure");
    dispatch({ type: actions.LOGOUT });
  };
  return (
    <header className="header px-3 py-3">
      <div className="container d-flex justify-content-between mt-4">
        <Link
          to="/dispatch"
          onClick={() => setToActive("dispatch")}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <div className="d-flex align-items-center">
            BE
            <h1>
              <strong>Stranded</strong>
            </h1>
          </div>
        </Link>
        {USER_Context_State?.user ? (
          <div>
            <nav className="d-flex align-items-center">
              <label htmlFor="collpase-btn-check" className="collpase-btn">
                <i className="fas fa-bars"></i>
              </label>
              <input type="checkbox" id="collpase-btn-check" />
              <ul className="mb-1">
                <li>
                  <Link
                    to="/dispatch"
                    className={active === "dispatch" ? "active" : ""}
                    onClick={() => setToActive("dispatch")}
                  >
                    <BiRadio style={{ fontSize: "20px" }} />
                    <span>Dispatch</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/island"
                    className={active === "island" ? "active" : ""}
                    onClick={() => setToActive("island")}
                  >
                    <GiIsland style={{ fontSize: "20px" }} />
                    <span>Island</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className={active === "departure" ? "active" : ""}
                    onClick={() => handelLogout()}
                  >
                    <GiAirplaneDeparture style={{ fontSize: "20px" }} />
                    <span>Departure</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div>
            <nav className="d-flex align-items-center">
              <label htmlFor="collpase-btn-check" className="collpase-btn">
                <i className="fas fa-bars"></i>
              </label>
              <input type="checkbox" id="collpase-btn-check" />
              <ul className="mb-1">
                <li>
                  <Link
                    to="/"
                    className={active === "arrival" ? "active" : ""}
                    onClick={() => setToActive("arrival")}
                  >
                    <GiAirplaneArrival style={{ fontSize: "20px" }} />
                    <span>Arrival</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
