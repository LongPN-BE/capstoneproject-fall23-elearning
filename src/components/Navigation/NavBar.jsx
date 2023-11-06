import React, { useEffect, useState } from 'react';
import { SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import logo from './../../assets/images/logo.png';
import { navData } from '../../util/Constants';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Cookies from 'js-cookie';

const NavBar = ({ children }) => {
  const { collapseSidebar } = useProSidebar();
  const [userRole, setUserRole] = useState('manager'); // Change role as needed

  // Get the navigation items based on the user's role
  const navItems = navData[userRole] || [];

  useEffect(() => {
    const user = JSON.parse(Cookies.get('user'))
    if (user) {
      setUserRole(String(user?.role).toLowerCase())
    }
  }, [])

  const handleLogout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    window.location.href = '/';
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar className="app">
        <Menu>
          <Menu>
            <MenuItem
              className="menu1"
              icon={
                <MenuRoundedIcon
                  onClick={() => {
                    collapseSidebar();
                  }}
                />
              }
            >
              <img alt="logo" src={logo} width={150} />
            </MenuItem>
            {navItems.map((item, index) =>
              // Check if the item has subItems to render submenu
              item.subItems ? (
                <SubMenu key={index} label={item.label} icon={item.icon}>
                  {item.subItems.map((subItem, subIndex) => (
                    <MenuItem
                      key={subIndex}
                      icon={subItem.icon}
                      component={<Link to={subItem.path} className="link" />}
                    >
                      {subItem.label}
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem key={index} icon={item.icon} component={<Link to={item.path} className="link" />}>
                  {item.label}
                </MenuItem>
              ),
            )}
            <MenuItem icon={<LogoutRoundedIcon />} onClick={handleLogout}>
              {' '}
              Logout{' '}
            </MenuItem>
          </Menu>
        </Menu>
      </Sidebar>
      <section style={{ width: '100%' }}>{children}</section>
    </div>
  );
};

export default NavBar;
