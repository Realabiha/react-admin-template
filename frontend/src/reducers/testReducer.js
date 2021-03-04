import {TEST_ACTION_TYPE, TEST_ACTION_TYPE_ASYNC, TEST_ACTION_TYPE_ASYNCOVER} from '../actionType'
const  initTestState = 0;
export default function testReducer(preState=initTestState, action){
  const {type, data} = action;
  console.log(data, 'data');
  switch (type) {
    case TEST_ACTION_TYPE:
      return 'test' + data       
    case TEST_ACTION_TYPE_ASYNC:
      return 'test' + data
    case TEST_ACTION_TYPE_ASYNCOVER:
      return 'test' + data
    default:
      return preState
  }
}