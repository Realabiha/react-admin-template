import {USER_LOGIN_ACTION, USER_LOGOUT_ACTION} from '../actionType';
const user = localStorage.getItem('user'),
      token = localStorage.getItem('token');
const userInfo = {
  user: user || {}, 
  token: token || '', 
  isLogin: !!(user && token)
}

function loginReducer(preState = userInfo, action){
  const {type, data} = action;
  console.log(data, 'data');
  switch (type) {
    case USER_LOGIN_ACTION:
      return {user: data.user, token: data.token, isLogin: true}
    case USER_LOGOUT_ACTION:
      return {user: {}, token: '', isLogin: false}
    default:
      return preState;
  }
}

export default loginReducer;