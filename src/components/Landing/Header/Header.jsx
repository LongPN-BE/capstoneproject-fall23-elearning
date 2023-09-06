import React, { useRef } from "react";
import { Container, Button } from "reactstrap";
import "./Header.scss";
import Logo from "../../../assets/images/logo.png";

const navLinks = [
  {
    display: "Home",
    url: "#",
  },
  {
    display: "Courses",
    url: "#",
  },
  {
    display: "About",
    url: "#",
  },
];

const Header = () => {
  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <a class="navbar-brand" href="/">
              <img src={Logo} style={{ height: 30 }} alt="" />
            </a>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right">
              <div className="mb-0 d-flex align-items-center gap-2">
                <a href="#">Login</a>
                <div>
                  <a href="#" class="btn">
                    Join for free
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mobile__menu">
            <span>
              <i class="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
