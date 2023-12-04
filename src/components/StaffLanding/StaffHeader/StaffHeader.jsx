import React, { useRef } from 'react';
import { Container } from 'reactstrap';
import Logo from '../../../assets/images/logo.png';
import Styles from './StaffHeader.module.scss';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { useState } from 'react';
import profile_image from './../../../assets/images/mask-group.png';
import { Link } from 'react-router-dom';
import { Divider, IconButton, InputBase, Paper, Typography, Avatar } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import Cookies from 'js-cookie';
import { AccountControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';

const userApi = new AccountControllerApi(ApiClientSingleton.getInstance());

const navLinks = [
  {
    display: 'Home',
    url: '#',
  },
  {
    display: 'Courses',
    url: '#',
  },
  {
    display: 'About',
    url: '#',
  },
];

const StaffHeader = () => {
  const menuRef = useRef();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(Cookies.get('user')));
    console.log(JSON.parse(Cookies.get('user')));
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle('active__menu');

  const toggleDropdown = () => {
    const dropdown = document.getElementById('myDropdown');
    dropdown.classList.toggle(Styles.show__dropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <header style={{ paddingRight: '8%' }} className={classNames(Styles.header_custom, 'border-bottom')}>
      <div className="navigation d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-4">
          <div className="logo">
            <Typography>Mừng trở lại </Typography>
          </div>
          {/* <div>
            <Paper
              component="form"
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="What do you want to learn?"
                inputProps={{ 'aria-label': 'What do you want to learn?' }}
              />
              <IconButton type="button" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div> */}
        </div>

        <div className="nav d-flex align-items-center gap-5">
          <div className={classNames(Styles.nav__menu)} ref={menuRef} onClick={menuToggle}>
            <ul className={classNames(Styles.nav__list)}></ul>
          </div>

          <div className={classNames(Styles.nav__right, 'p-1 border rounded-pill')}>
            {user !== null ? (
              <>
                <div
                  className={classNames('d-flex align-items-center ', Styles.dropdown__container)}
                  onClick={toggleDropdown}
                >
                  <div className="p-1 border rounded-circle">
                    <div style={{ backgroundColor: '#9EA8FF', opacity: '90%' }} className="rounded-circle">
                      <img src={profile_image} alt="profile_image" width={30} height={30} />
                    </div>
                  </div>

                  <div className="mx-2">{user.username}</div>
                </div>
                <div className={Styles.dropdown} id="myDropdown">
                  <div style={{ color: 'black' }} className="p-3">
                    <Typography> {user?.name} </Typography>
                    <div style={{ opacity: '70%' }}>
                      <Typography variant="caption" style={{ fontWeight: 700 }}>
                        {user?.role == 'STAFF' ? 'MANAGER' : 'ADMIN'}
                      </Typography>
                    </div>
                  </div>
                  <Divider />
                  <ul>
                    <Link to="/dashboard">
                      <li>Dashboard </li>
                    </Link>
                    <Link to="/my-profile">
                      <li>My Profile </li>
                    </Link>
                    {/* <Link to="/settings">
                        {' '}
                        <li>Settings </li>
                      </Link> */}
                    <li onClick={handleLogout}>Log Out</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="mb-0 d-flex align-items-center gap-2">
                <div>
                  <p>Session time out!! Please login again.</p>
                </div>
                <a href="/login" className={classNames(Styles.nav__btn, 'btn')}>
                  Login
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StaffHeader;
