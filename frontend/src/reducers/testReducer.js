import {TEST_ACTION_TYPE, TEST_ACTION_TYPE_ASYNC, TEST_ACTION_TYPE_ASYNCOVER} from '../actionType'
const  initTestState = 0;
export default function testReducer(preState=initTestState, action){
  const {type, data} = action;
  switch (type) {
    case TEST_ACTION_TYPE:
      return 'testsync'       
    case TEST_ACTION_TYPE_ASYNC:
      return 'testasync'
    case TEST_ACTION_TYPE_ASYNCOVER:
      return 'testasyncover'
    default:
      return preState
  }
  
}