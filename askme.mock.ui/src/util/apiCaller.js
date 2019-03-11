import axios from 'axios';

export const API_URL = 'http://localhost:3000/api';
let token = localStorage.getItem('jwtToken');

export default function callApi(endpoint, method = 'get', body) {
  console.log("here",body);
  return axios(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' , 'Authorization': token},
    method,
    data: JSON.stringify(body),
  })
  .then(res => {
    return res;
})
.catch(err => {
    console.log('ERROR: ',err);
});
}
