import axios from 'axios';

export const API_URL =  '/api';


export default function callApi(endpoint, method = 'get', body) {
  return axios(`/${endpoint}`, {
    baseURL:API_URL,
    method,
    data: JSON.stringify(body),
    headers: {'Content-Type':'application/json'}
  })
  .then(res => {
    return res;
}, error => {
  return error.response;
})
.catch(err => {
    console.log('ERROR: ',err);
});
}

axios.interceptors.request.use(
  config => {
    if (config.baseURL === API_URL && !config.headers.Authorization) {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        config.headers.Authorization = token;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);