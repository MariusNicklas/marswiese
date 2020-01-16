import axios from "axios";

const url = process.env.REACT_APP_URL_MARSWIESE;

const catchAxiosError = error => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);

  throw error;
};

/**
 *
 * @param {String} email
 * @param {String} password
 * @returns {Promise<JSON>}
 */
export const login = (email, password) => {
  try {
    return axios({
      method: "POST",
      withCredentials: true,
      url: `${url}/api/v2/users/login`,
      data: {
        email: email,
        password: password
      }
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAllUsers = () => {
  return axios({
    method: "GET",
    withCredentials: true,
    url: `${url}/api/v2/users `
  })
    .then(response => [...response.data.data])
    .catch(err => catchAxiosError(err));
};

export const deleteUserById = id => {
  return axios({
    method: "DELETE",
    withCredentials: true,
    url: `${url}/api/v2/users/${id}`
  })
    .then(res => res)
    .catch(err => catchAxiosError(err));
};

export const updateUserById = (id, options) => {
  return axios({
    method: "PATCH",
    withCredentials: true,
    url: `${url}/api/v2/users/${id}`,
    data: options
  })
    .then(res => res)
    .catch(err => catchAxiosError(err));
};

export const getAllUsersPaginated = (page, limit) => {
  const pageparam = page ? page : 1;
  const limitparam = limit ? limit : 10;
  return axios({
    method: "GET",
    withCredentials: true,
    url: `${url}/api/v2/users?page=${pageparam}&limit=${limitparam}`
  })
    .then(response => [...response.data.data])
    .catch(err => catchAxiosError(err));
};

export const register = input => {
  return axios({
    method: "POST",
    withCredentials: true,
    url: `${url}/api/v2/users/signup`,
    data: input
  })
    .then(response => response)
    .catch(err => catchAxiosError(err));
};

export const isLoggedIn = () => {
  return axios({
    method: "GET",
    withCredentials: true,
    url: `${url}/api/v2/users/isLoggedIn`
  })
    .then(response => {
      return response.data.status === "success";
    })
    .catch(err => catchAxiosError(err));
};

export const getAllCamps = () => {
  return axios({
    method: "GET",
    withCredentials: true,
    url: `${url}/api/v2/camps `
  })
    .then(response => [...response.data.data])
    .catch(err => catchAxiosError(err));
};
