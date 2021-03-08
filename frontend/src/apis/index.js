import axios from './ajax';

const BASE_URL = 'http://localhost:3000';

export const getUserList = function(){
  return axios.get(`${BASE_URL}/api/users`)
}
export const userLogin = function(data){
  return axios.post(`${BASE_URL}/api/users/signin`, data)
}
export const userRegister = function(data){
  return axios.post(`${BASE_URL}/api/users/register`, data)
}
export const userUpdate = function(data){
  return axios.put(`${BASE_URL}/api/users/update/${data.userId}`, data)
}
export const userDelete = function(userId){
  return axios.post(`${BASE_URL}/api/users/delete/${userId}`)
}
