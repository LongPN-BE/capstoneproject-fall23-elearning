import Styles from './Navbar.module.scss';
import classNames from 'classnames';
import 'boxicons';

import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider, IconButton, InputBase, Paper, Typography, Avatar } from '@mui/material';
import Cookies from 'js-cookie';
import { CourseControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());

const Navbar = () => {
  const menuRef = useRef();
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState();
  const [pendingCourses, setPendingCourses] = useState();

  const getCourses = () => {
    courseApi.getAllCourses((err, res) => {
      if (res) {
        setCourses(res);
        const pending = res.filter((course) => course.status === 'PENDING');
        setPendingCourses(pending);
      }
    });
  };

  useEffect(() => {
    getCourses();
    setUser(JSON.parse(Cookies.get('user')));
    console.log(JSON.parse(Cookies.get('user')));
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle('active__menu');

  const toggleDropdown = () => {
    const dropdown = document.getElementById('myDropdown');
    dropdown.classList.toggle(Styles.show__dropdown);
  };

  const toggleDropdownNoti = () => {
    const dropdown = document.getElementById('myDropdownNoti');
    dropdown.classList.toggle(Styles.show__dropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className={classNames(Styles.navbar)}>
      <div className={classNames(Styles.logo)}>
        <img src="logo.svg" alt="" />
        <span>Bảng điều khiển</span>
      </div>
      <div className={classNames(Styles.icons, 'mx-5')}>
        <div
          className={classNames(Styles.notification, classNames(Styles.dropdown__container))}
          onClick={toggleDropdownNoti}
        >
          <box-icon
            name="bell"
            type="solid"
            animation="tada-hover"
            flip="horizontal"
            color="rgba(0,0,0,0.71)"
          ></box-icon>
          {pendingCourses ? (
            <>
              <span>{pendingCourses?.length}</span>

              <div className={Styles.dropdown} id="myDropdownNoti">
                <div style={{ color: 'black', backgroundColor: '#f6f6f6' }} className="p-3">
                  <Typography> Notification </Typography>
                </div>
                <Divider />
                <ul>
                  <Link to="/courses">
                    <li>{pendingCourses.length} course(s) waiting for approval.</li>
                  </Link>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className={Styles.dropdown} id="myDropdownNoti">
                <div style={{ color: 'black' }} className="p-3">
                  <Typography> Notification </Typography>
                </div>
                <Divider />
                <ul>
                  <li>There's no new notification</li>
                </ul>
              </div>
            </>
          )}
        </div>
        <div className={classNames(Styles.dropdown__container)} onClick={toggleDropdown}>
          <div className="d-flex">
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
            />
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
        </div>
        {/* <box-icon name="cog" type="solid" animation="spin-hover" color="rgba(0, 0, 0, 0.611)"></box-icon> */}
      </div>
    </div>
  );
};

export default Navbar;
