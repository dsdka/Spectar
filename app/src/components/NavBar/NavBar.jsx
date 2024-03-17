import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { navigationMenu } from '../../configs/navigationMenu';

import { Menu } from 'antd';
import classes from './NavBar.module.css';

function NavBar(props) {

  let location = useLocation();

  const [name, setName] = useState("/");

  useEffect(() => {
    setName(location.pathname)

  }, [location.pathname]);

  const handleSelect = (ev) => {
    setName(ev.key);
  }

  const navItems = navigationMenu(props.user?.userRole).flatMap(item => {
    return(
      { label: (
      <div className={name === item.path ? classes.navItemSelected : classes.navItem} >
      <Link to={item.path} name={item.path}>{item.label}</Link>
    </div>
    ),
    key: item.path
      }
    )
  })

  return (
  <div className={classes.navMenuWrapper}>
        <Menu
          className={classes.navWrapper}
          onClick={handleSelect}
          mode="horizontal"
          items={navItems}
        />
          {/* {navItems}
        </Menu> */}
      </div>
  )
}

export default NavBar