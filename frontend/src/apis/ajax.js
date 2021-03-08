import store from '../redux';
import axios from 'axios';
import {message} from 'antd';
import {logoutAction} from '../redux/actions/loginAction'

const instance = axios.create({
  timeout: 3000
})

instance.interceptors.request.use(beforeRequestSend, handleRequestError);
instance.interceptors.response.use(beforeResponseSend, handleResponseError)

function beforeRequestSend(config){
  const token = localStorage.getItem('token');
  config.headers['token'] = token;
  return config;
}
function handleRequestError(error){
  message.error(error.message, 1);
  return Promise.reject(error)
}

// 2xx
function beforeResponseSend(response){
  // token
  if(response.data.status === '401'){
    store.dispatch(logoutAction())
    message.error(response.data.msg, 1);
    return;
  }
  return response.data; 
}
// 非2xx
function handleResponseError(error){
  message.error(error.message, 1);
  return Promise.reject(error);
}
export default instance;