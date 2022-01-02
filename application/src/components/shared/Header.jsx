import React from "react";

const Header = () => {
  return (
    <header className="header px-3 py-2">
      <div className="container d-flex justify-content-between mt-3">
        <div className="d-flex align-items-center">
          BE
          <h1>Stranded</h1>
        </div>
        <div>
          <nav>
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-igloo" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-book" />
                  <span>Journal</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fas fa-plane-departure" />
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
