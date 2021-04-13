import React from "react";
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
          <li
            onClick={() => {
              history.push("/dashboard");
              handleResp();
            }}
          >
            Dashboard
          </li>
          <li
            onClick={() => {
              history.push("/register");
              handleResp();
            }}
          >
            Internships
          </li>
          <li
            onClick={() => {
              history.push("/slots");
              handleResp();
            }}
          >
            Slots
          </li>
          <button
            type="submit"
            onClick={handleClick}
            class="login-button"
            href="#"
          >
            Logout
          </button>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
