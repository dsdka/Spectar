import axios from 'axios';

import { baseUrl } from './baseUrl';
console.log('baseUrl', baseUrl)

axios.defaults.withCredentials = true;

const genericApi = {
  post: (path, data) => axios({
    method: 'post',
    url: baseUrl + path,
    data
  }).then(handleResponse).catch((error) => handleError(error)),

  get: (path) => axios({
    method: 'get',
    url: baseUrl + path
  }).then(handleResponse).catch((error) => handleError(error)),

  put: (path, data) => axios({
    method: 'put',
    url: baseUrl + path,
    data
  }).then(handleResponse).catch((error) => handleError(error)),

  delete: (path, data) => axios({
    method: 'delete',
    url: baseUrl + path,
    data
  }).then(handleResponse).catch((error) => handleError(error)),

  postFile: (path, data) => axios({
    method: 'post',
    url: baseUrl + path,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(handleResponse).catch((error) => handleError(error))
};

function handleResponse(resp) {
  if (!resp) {
    throw new Error('Server not required');
  } else if (resp && resp.status === 200) {
    console.log(resp)
    return resp.data;
  }
}

function handleError(error) {
  if (!error) {
    return;
  }
  if (!error.response) {
    throw new Error(error.message || 'Something is wrong');
  }

  else {
    const errorStatus = error.response.status;
    const responseError = error.response.data ? error.response.data : { message: 'Network Error' };

    switch (errorStatus) {
      case 401:
        throw new Error('Unauthorize');
      case 403:
        throw new Error('Forbidden');
      default:
        throw (responseError);
    }
  }
}

export default genericApi;