// test action creators

import {TEST_ACTION_TYPE, TEST_ACTION_TYPE_ASYNC, TEST_ACTION_TYPE_ASYNCOVER} from '../actionType';

export const testActionType = {
  type: TEST_ACTION_TYPE,
  data: 'sync'
}

// 异步： 发起、成功、失败
export const testActionTypeAsync = {
  type: TEST_ACTION_TYPE_ASYNC,
  data: 'async'
}
export const testActionTypeAsyncOver = {
  type: TEST_ACTION_TYPE_ASYNCOVER,
  data: 'asyncover'
}


export const testActionTypeAsync1 = function(){
  return function(dispatch){
    dispatch(testActionType);
    setTimeout(function(){
      dispatch(testActionTypeAsync)
    }, 500)
  }
}