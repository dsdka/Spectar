import axios from 'axios';

import { saveUser } from "./userSlice";

import { baseUrl } from '../api/baseUrl';

export const whoAmI = (navigate) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: baseUrl + '/whoAmI',
      withCredentials: true
    }).then(res => {
      const user = res.data;
      dispatch(saveUser(user));
    }).catch(error => {
      console.log(11111, error.response);
      navigate('/')
    })
  }
}
