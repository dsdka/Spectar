import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import loginRequestHandler from '../../api/loginRequestHandler';

import { saveUser } from '../../store/userSlice';

import {Card, Button, Input} from 'antd';

import classes from './LoginPage.module.css';

function LoginPage(_props) {
  
  const navigate = useNavigate();
  const dispatch= useDispatch();

  const user = useSelector(state => state.user.user);

  const [loginData, setLoginData] = useState({
    userName: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user])


  const handleChange = (event) => {
    const { name, value } = event.target;
    const newData = {
      ...loginData,
      [name]: value
    }
    setLoginData(newData);
  }

  const handleLogin = () => {
    loginRequestHandler.login(loginData).then(resp => {
      if (resp) {
        dispatch(saveUser(resp.userData));
      }
    },(error) => {
      console.log(11111, error)
    }).catch(error => {
      console.log(22222, error)
    })
  }

  const forgotPassword = () => {
    loginRequestHandler.login(loginData).then(resp => {
      if (resp) {
        dispatch(saveUser(resp.userData));
      }
    },(error) => {
      console.log(11111, error)

    }).catch(error => {
      console.log(22222, error)
    })
  }

  return (
      <Card className={classes.wrapper}>
        <div className={classes.title}>Вход в системата</div>
        <div>
          <div>Потребитрел</div>
          <div className={classes.form}>
            <Input 
              type='text'
              name='userName'
              value={loginData.userName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>Парола</div>
          <div className={classes.form}>
            <Input 
              type='password'
              name='password'
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.forgot} onClick={forgotPassword}>Забравена парола</div>
        <div className={classes.btnWrapper}><Button variant='primary' className={classes.btn} onClick={handleLogin}>Login</Button></div>
      </Card>
  )
}

export default LoginPage