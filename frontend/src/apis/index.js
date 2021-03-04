import axios from './ajax';

const BASE_URL = 'http://localhost:3000';

export const getUserList = function(){
  return axios.get(`${BASE_URL}/api/users`)
}