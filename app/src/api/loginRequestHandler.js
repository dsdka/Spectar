import genericApi from "./genericApi";

const loginRequestHandler = {
  login: (data) => {
    const url = `/login`;
    return genericApi.post(url, data)
  },

  logout: () => {
    const url = `/logout`;
    return genericApi.get(url);
  },

  forgotPassword: () => {
    const url = `/users/forgotPassword`;
    return genericApi.get(url);
  }
}

export default loginRequestHandler;