import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';

import classes from './Header.module.css';
import { Button } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import loginRequestHandler from '../../api/loginRequestHandler';
import { useDispatch } from "react-redux";
import { removeUser } from '../../store/userSlice';
// import NavBar from '../NavBar/NavBar';

function Header(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    loginRequestHandler.logout().then(resp => {
      dispatch(removeUser());
      goToInitPage();
    }).catch (error => {
      console.log(error)
    })
  }

  const login = () => {
    navigate('/login')
  }

  const goToInitPage = () => {
    navigate('/')
  }

  return (
    <div className={classes.wrapper}>
        <img src={logo} alt="" className={classes.logo} onClick={goToInitPage}/>
        {/* <NavBar user={props.user} /> */}
        <h3 className={classes.title}>Център Пловдив</h3>
        <div className={classes.login_wrapper}>
        {props.user ? <div className={classes.user_wrapper}>
          <UserOutlined style={{ fontSize: '16px' }}/>
          <span className={classes.user_name}>Здравейте: {props.user.userName}</span>
          <Button type="primary" ghost onClick={logout}>Изход</Button>
          </div> : <div>
        <Button type="primary" ghost onClick={login}>Вход</Button></div>}
        </div>
    </div>
  )
}

export default Header;