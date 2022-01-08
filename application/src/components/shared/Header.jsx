import React, { useState } from "react";
import {BiRadio} from "react-icons/bi"
import {GiIsland} from "react-icons/gi"
import {GiAirplaneDeparture} from "react-icons/gi"


const Header = () => {
  const [active, setActive] = useState("dispatch");

  const setToActive = (dir) => {
    setActive(dir);
  };
  return (
    <header className="header px-3 py-3">
      <div className="container d-flex justify-content-between mt-4">
        <div className="d-flex align-items-center">
          BE
          <h1>
            <strong>Stranded</strong>
          </h1>
        </div>
        <div>
          <nav className="d-flex align-items-center">
            <label htmlFor="collpase-btn-check" className="collpase-btn">
              <i className="fas fa-bars"></i>
            </label>
            <input type="checkbox" id="collpase-btn-check" />
            <ul className="mb-1">
              <li>
                <a
                  className={active === "dispatch" ? "active" : ""}
                  href="#"
                  onClick={() => setToActive("dispatch")}
                >
                  <BiRadio style={{fontSize:"20px"}}/>
                  <span>Dispatch</span>
                </a>
              </li>
            <li>
                <a
                  className={active === "home" ? "active" : ""}
                  href="#"
                  onClick={() => setToActive("home")}
                >
                  <GiIsland style={{fontSize:"20px"}}/>
                  <span>Island</span>
                </a>
              </li>
              <li>
                <a
                  className={active === "departure" ? "active" : ""}
                  href="#"
                  onClick={() => setToActive("departure")}
                >
                  <GiAirplaneDeparture style={{fontSize:"20px"}} />
                  <span>Departure</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
