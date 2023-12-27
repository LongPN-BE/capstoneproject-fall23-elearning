import React, { useRef } from 'react';
import { Container } from 'reactstrap';
import Logo from '../../../assets/images/logo.png';
import Styles from './Header.module.scss';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { useState } from 'react';
import profile_image from './../../../assets/images/mask-group.png';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, InputBase, Paper } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import Cookies from 'js-cookie';

const navLinks = [
  {
    display: 'Trang chủ',
    url: '/',
  },
  {
    display: 'Danh sách khóa học',
    url: '/all-courses',
  },
  {
    display: 'Chúng tôi',
    url: '##',
  },
];

const Header = ({ setSearchValue, getCourses }) => {
  const menuRef = useRef();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle('active__menu');

  const toggleDropdown = () => {
    const dropdown = document.getElementById('myDropdown');
    dropdown.classList.toggle(Styles.show__dropdown);
  };

  const handleLogout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    window.location.href = '/';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <header className={classNames(Styles.header_custom)}>
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-4">
            <div className="logo">
              <Link className="navbar-brand" to="/">
                <img src={Logo} style={{ height: 30 }} alt="" />
              </Link>
            </div>
            {user ? (
              <>
                <div>
                  <Paper
                    component="form"
                    sx={{
                      p: '2px 4px',
                      display: 'flex',
                      alignItems: 'center',
                      width: 400,
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Bạn muốn tìm hiểu về nội dung gì?"
                      inputProps={{ 'aria-label': 'Bạn muốn tìm hiểu về nội dung gì?' }}
                      onChange={(e) => {
                        if (setSearchValue) {
                          setSearchValue(e.target.value);
                        }
                      }}
                      onKeyDown={handleKeyDown}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: '10px' }}
                      aria-label="search"
                      onClick={() => {
                        if (getCourses) {
                          getCourses();
                        }
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className={classNames(Styles.nav__menu)} ref={menuRef} onClick={menuToggle}>
              <ul className={classNames(Styles.nav__list)}>
                {navLinks.map((item, index) => (
                  <li key={index} className={classNames(Styles.nav__item)}>
                    <Link to={item.url}>{item.display}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={classNames(Styles.nav__right)}>
              {user ? (
                <>
                  <div
                    className={classNames('d-flex align-items-center', Styles.dropdown__container)}
                    onClick={toggleDropdown}
                  >
                    <img src={profile_image} alt="profile_image" width={30} height={34} />
                    <div className="mx-2">{user.username}</div>
                  </div>
                  <div className={Styles.dropdown} id="myDropdown">
                    <ul>
                      <Link to="/my-course">
                        <li>Khóa học của tôi </li>
                      </Link>
                      <Link to="/my-profile">
                        <li>Trang cá nhân </li>
                      </Link>
                      <li onClick={handleLogout}>Đăng xuất</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="mb-0 d-flex align-items-center gap-2">
                  <Link to="/login" className={classNames(Styles.nav__btn, 'btn')}>
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className={classNames(Styles.mobile__menu)}>
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
