import React, { useRef } from "react";
import { Container } from "reactstrap";
import Logo from "../../../assets/images/logo.png";
import Styles from "./Header.module.scss";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useState } from "react";
import profile_image from './../../../assets/images/mask-group.png'
import { Link, Router } from "react-router-dom";

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
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const toggleDropdown = () => {
    const dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle(Styles.show__dropdown);
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = '/'
  }


  return (
    <header className={classNames(Styles.header_custom)}>
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <a className="navbar-brand" href="/">
              <img src={Logo} style={{ height: 30 }} alt="" />
            </a>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div
              className={classNames(Styles.nav__menu)}
              ref={menuRef}
              onClick={menuToggle}
            >
              <ul className={classNames(Styles.nav__list)}>
                {navLinks.map((item, index) => (
                  <li key={index} className={classNames(Styles.nav__item)}>
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={classNames(Styles.nav__right)}>
              {
                user !== null ? (
                  <>

                    <div className={classNames('d-flex align-items-center', Styles.dropdown__container)} onClick={toggleDropdown}>
                      <img src={profile_image} alt="profile_image" width={30} height={34} />
                      <div className="mx-2">{user.username}</div>
                    </div>
                    <div className={Styles.dropdown} id="myDropdown">
                      <ul>
                        <Link to="/my-course"><li>My Course </li></Link>
                        <Link to="/my-profile"><li>My Profile </li></Link>
                        <Link to="/settings"> <li>Settings </li></Link>
                        <Link to="/accomplishments"> <li>Accomplishments</li></Link>
                        <Link to="/my-wallet"><li>My Wallet </li></Link>
                        <li onClick={handleLogout}>Log Out</li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="mb-0 d-flex align-items-center gap-2">
                    <a href="/login" className={classNames(Styles.nav__btn, 'btn')}>Login</a>
                    <div>
                      <a href="/" className={classNames("btn", Styles.nav__btn)}>
                        Join for free
                      </a>
                    </div>
                  </div>
                )
              }
            </div>
          </div>

          <div className={classNames(Styles.mobile__menu)}>
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container >
    </header >
  );
};

export default Header;
