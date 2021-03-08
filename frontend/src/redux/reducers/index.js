import {combineReducers} from 'redux';
import testReducer from './testReducer'
import loginReducer from './loginReducer'
import saveMenuTitle from './saveMenuTitle'
export default combineReducers({
  test: testReducer,
  userInfo: loginReducer,
  menuTitle: saveMenuTitle
})