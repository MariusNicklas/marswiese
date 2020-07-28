import axios from 'axios';

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
    console.log('Error', error.message);
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
  return axios({
    method: 'POST',
    withCredentials: true,
    url: `${url}/api/v1/users/login`,
    data: {
      email: email,
      password: password
    }
  })
    .then(response => response)
    .catch(err => catchAxiosError(err));
};

export const logout = () => {
  return axios({
    method: 'POST',
    withCredentials: true,
    url: `${url}/api/v1/users/logout`
  })
    .then(response => response)
    .catch(err => catchAxiosError(err));
};

export const getAllUsers = () => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/users `
  })
    .then(response => [...response.data.data])
    .catch(err => catchAxiosError(err));
};

export const deleteUserById = id => {
  return axios({
    method: 'DELETE',
    withCredentials: true,
    url: `${url}/api/v1/users/${id}`
  })
    .then(res => res)
    .catch(err => catchAxiosError(err));
};

export const updateUserById = (id, options) => {
  return axios({
    method: 'PATCH',
    withCredentials: true,
    url: `${url}/api/v1/users/${id}`,
    data: options
  })
    .then(res => res)
    .catch(err => catchAxiosError(err));
};

export const getAllUsersPaginated = (page, limit) => {
  const pageparam = page ? page : 1;
  const limitparam = limit ? limit : 10;
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/users?page=${pageparam}&limit=${limitparam}`
  })
    .then(response => [...response.data.data])
    .catch(err => catchAxiosError(err));
};

export const register = input => {
  return axios({
    method: 'POST',
    withCredentials: true,
    url: `${url}/api/v1/users/signup`,
    data: input
  })
    .then(response => response)
    .catch(err => catchAxiosError(err));
};

export const createCamp = input => {
  return axios({
    method: 'POST',
    withCredentials: true,
    url: `${url}/api/v1/camps`,
    data: input
  })
    .then(response => response.data.data)
    .catch(err => catchAxiosError(err));
};

export const getCampById = id => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/camps/${id}`
  })
    .then(response => response.data.data.data)
    .catch(err => catchAxiosError(err));
};

/*
 * fromDate and toDate must be a ISODate on daytime 0:00 ex.: "2020-04-06T00:00:00.000Z"
 */
export const getCampsByTimeInterval = (fromDate, toDate) => {
  if (!fromDate || !toDate) {
    throw new Error('toDate and/or fromDate not set');
  }
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/camps/timeinterval/${fromDate}/${toDate}`
  })
    .then(response => response.data.data)
    .catch(err => catchAxiosError(err));
};

export const getAllCampWeeks = () => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/camps/weeks`
  })
    .then(response => response.data.data)
    .catch(err => catchAxiosError(err));
};

export const isLoggedIn = () => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/users/isLoggedIn`
  })
    .then(response => {
      return response.data.status === 'success';
    })
    .catch(err => catchAxiosError(err));
};

export const getAllCamps = () => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/camps `
  })
    .then(response => [...response.data.data])
    .catch(err => catchAxiosError(err));
};

export const getAllCategories = () => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/categories/labels`
  })
    .then(response => [...response.data.data])
    .catch(err => catchAxiosError(err));
};

export const postCampPseudoBooking = input => {
  return axios({
    method: 'POST',
    withCredentials: true,
    url: `${url}/api/v1/camppseudobookings`,
    data: input
  })
    .then(response => response)
    .catch(err => catchAxiosError(err));
};

export const getMe = () => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/users/me `
  })
    .then(response => response.data.data.data)
    .catch(err => catchAxiosError(err));
};

export const getShoppingCart = () => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/shoppingcarts`
  })
    .then(response => response.data.data.shoppingCart)
    .catch(err => catchAxiosError(err));
};

export const deleteCampPseudoBooking = id => {
  return axios({
    method: 'DELETE',
    withCredentials: true,
    url: `${url}/api/v1/camppseudobookings/${id}`
  })
    .then(response => response)
    .catch(err => catchAxiosError(err));
};

export const getPayPalPaymentSession = () => {
  return axios({
    method: 'POST',
    withCredentials: true,
    url: `${url}api/v1/payments/paypal`
  })
    .then(response => response)
    .catch(err => catchAxiosError(err));
};

export const getVisaPaymentSession = () => {
  return axios({
    method: 'POST',
    withCredentials: true,
    url: `${url}api/v1/payments/card`
  })
    .then(response => response)
    .catch(err => catchAxiosError(err));
};

export const getKlarnaPaymentSession = () => {
  return axios({
    method: 'POST',
    withCredentials: true,
    url: `${url}api/v1/payments/sofort`
  })
    .then(response => response)
    .catch(err => catchAxiosError(err));
};

export const getEpsPaymentSession = () => {
  return axios({
    method: 'POST',
    withCredentials: true,
    url: `${url}api/v1/payments/eps`
  })
    .then(response => response)
    .catch(err => catchAxiosError(err));
};

export const getMyCampBookings = () => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}api/v1/campbookings/my`
  })
    .then(response => response.data.data)
    .catch(err => catchAxiosError(err));
};

export const getAllCourses = () => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}api/v1/courses`
  })
    .then(response => response.data.data)
    .catch(err => catchAxiosError(err));
};

export const getCourse = id => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/courses/${id}`
  })
    .then(response => response.data.data.data)
    .catch(err => catchAxiosError(err));
};

export const getCategory = id => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/categories/${id}`
  })
    .then(response => response.data.data.data)
    .catch(err => catchAxiosError(err));
};

export const postCoursePseudoBooking = input => {
  return axios({
    method: 'POST',
    withCredentials: true,
    url: `${url}/api/v1/coursepseudobookings`,
    data: input
  })
    .then(response => response)
    .catch(err => catchAxiosError(err));
};

export const getCoursesByCategory = () => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/courses/by-category`
  })
    .then(response => response.data.data.data)
    .catch(err => catchAxiosError(err));
};

export const getMyCourseBookings = () => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}api/v1/coursebookings/my`
  })
    .then(response => response.data.data)
    .catch(err => catchAxiosError(err));
};

export const getCourseById = id => {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${url}/api/v1/courses/${id}`
  })
    .then(response => response.data.data.data)
    .catch(err => catchAxiosError(err));
};

export const deleteCoursePseudoBooking = id => {
  return axios({
    method: 'DELETE',
    withCredentials: true,
    url: `${url}/api/v1/coursepseudobookings/${id}`
  })
    .then(response => response)
    .catch(err => catchAxiosError(err));
};
