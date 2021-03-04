import axios from 'axios';
const instance = axios.create({
  timeout: 3000
})

instance.interceptors.request.use(beforeRequestSend, handleRequestError);
instance.interceptors.response.use(beforeResponseSend, handleResponseError)

function beforeRequestSend(config){
  return config;
}
function handleRequestError(error){
  return Promise.reject(error)
}

function beforeResponseSend(response){
  return response;
}
function handleResponseError(error){
  return Promise.reject(error);
}
export default instance;