import {USER_LOGIN_ACTION, USER_LOGOUT_ACTION} from '../actionType';
import {userLogin} from '../apis/index'


// async
export const loginAction = function(data){
  return async function(dispatch){
    const {data: userInfo} = await userLogin(data);
    dispatch({
      type: USER_LOGIN_ACTION,
      data: userInfo
    })
    localStorage.setItem('user', JSON.stringify(userInfo.user));
    localStorage.setItem('token', userInfo.token);
    localStorage.setItem('isLogin', true);
  }
}
export const logoutAction = function(){
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('isLogin');
  return {
    type: USER_LOGOUT_ACTION
  }
}
