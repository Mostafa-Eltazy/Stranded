import React, { useState } from "react";
import { BiRadio } from "react-icons/bi";
import { GiIsland } from "react-icons/gi";
import { GiAirplaneDeparture } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = () => {
  const [active, setActive] = useState("dispatch");

  const setToActive = (dir) => {
    setActive(dir);
  };
  return (
    <header className="header px-3 py-3">
      <div className="container d-flex justify-content-between mt-4">
          <Link to="/dispatch" onClick={() => setToActive("dispatch")} style={{textDecoration: 'none', color:'#000'}}>
        <div className="d-flex align-items-center">
            BE
            <h1>
              <strong>Stranded</strong>
            </h1>
        </div>
          </Link>
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
                  to=""
                  className={active === "departure" ? "active" : ""}
                  onClick={() => setToActive("departure")}
                >
                  <GiAirplaneDeparture style={{ fontSize: "20px" }} />
                  <span>Departure</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
