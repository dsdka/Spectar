import genericApi from "./genericApi";


const userManagementRequestHandler = {
  getUsers: () => {
    const url = '/users';
    return genericApi.get(url);
  },

  createUser: (data) => {
    const url = '/register';
    return genericApi.put(url, data)
  },

  updateUser: (data) => {
    const url = '/users';
    return genericApi.post(url, data)
  },

  deleteUser: (id) => {
    const url = '/users';
    return genericApi.delete(url, { id: id })
  }
}

export default userManagementRequestHandler;
