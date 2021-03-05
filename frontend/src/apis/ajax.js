import axios from 'axios';
import {message} from 'antd'
const instance = axios.create({
  timeout: 3000
})

instance.interceptors.request.use(beforeRequestSend, handleRequestError);
instance.interceptors.response.use(beforeResponseSend, handleResponseError)

function beforeRequestSend(config){
  const token = localStorage.getItem('token') || '';
  config.headers['token'] = token;
  return config;
}
function handleRequestError(error){
  message.error(error.message);
  return Promise.reject(error)
}

function beforeResponseSend(response){
  return response.data;
}
function handleResponseError(error){
  message.error(error.message);
  return Promise.reject(error);
}
export default instance;