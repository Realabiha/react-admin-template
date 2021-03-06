import {USER_LOGIN_ACTION, USER_LOGOUT_ACTION} from '../actionType';
const user = JSON.parse(localStorage.getItem('user')),
      token = localStorage.getItem('token');
const userInfo = {
  user: user || {}, 
  token: token || '', 
  isLogin: !!(user && token)
}

function loginReducer(preState = userInfo, action){
  const {type, data} = action;
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