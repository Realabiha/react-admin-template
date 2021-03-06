import {USER_LOGIN_ACTION, USER_LOGOUT_ACTION} from '../actionType';
import {userLogin} from '../../apis/index'
import {message} from 'antd'


// async
export const loginAction = function(data){
  return async function(dispatch){
    const res = await userLogin(data);
    if(res.status === '1'){
      const data = res.data;
      dispatch({
        type: USER_LOGIN_ACTION,
        data
      })
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      localStorage.setItem('isLogin', true);
      return;
    }
    message.error(res.msg, 1);
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
// export const logoutAction = {
//   type: USER_LOGOUT_ACTION
// }