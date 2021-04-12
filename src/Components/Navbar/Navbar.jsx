import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import LOGO from "../../Assets/logo.png";
import { useHistory } from "react-router";

function Navbar() {
  const history = useHistory();
  const handleResp = () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");
    navLinks.classList.toggle("open");
    links.forEach((link) => {
      link.classList.toggle("fade");
    });
    hamburger.classList.toggle("toggle");
  };

  const handleClick = () => {
    console.log(localStorage.getItem("token"));
    localStorage.removeItem("token");
    console.log(localStorage.getItem("tokens"));
    history.push("/");
  };
  return (
    <div>
      <nav>
        <div class="logo">
          <img src={LOGO} alt="Logo Image" />
        </div>
        <div class="hamburger" onClick={handleResp}>
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
        <ul class="nav-links">
          <li>
            <a href="#">
              <Link to="/dashboard">Dashboard</Link>
            </a>
          </li>
          <li>
            <a href="#">
              <Link to="/register"> Internships</Link>
            </a>
          </li>
          <li>
            <a href="#">
              <Link to="/slots"> Your slots</Link>
            </a>
          </li>
          <li>
            <button
              type="submit"
              onClick={handleClick}
              class="login-button"
              href="#"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
