import React, { useState } from "react";

const Header = () => {
  const [active, setActive] = useState("home");

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
                  className={active === "home" ? "active" : ""}
                  href="#"
                  onClick={() => setToActive("home")}
                >
                  <i className="fas fa-igloo" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a
                  className={active === "journal" ? "active" : ""}
                  href="#"
                  onClick={() => setToActive("journal")}
                >
                  <i className="fas fa-book" />
                  <span>Journal</span>
                </a>
              </li>
              <li>
                <a
                  className={active === "departure" ? "active" : ""}
                  href="#"
                  onClick={() => setToActive("departure")}
                >
                  <i className="fas fa-plane-departure" />
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
