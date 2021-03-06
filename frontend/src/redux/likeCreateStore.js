export const createStore = function (reducer){
  let state, callbacks = [];
  function getState(){
    return state;
  }
  function dispatch(action){
    state = reducer(state, action)
    callbacks.forEach(cb => cb());
  };
  function subscribe(callback){
    callbacks.push(callback);
    return function(){
      callbacks = callbacks.filter(cb => cb !== callback)
    }
  }
  dispatch({type: '@INIT'})
  return {getState, dispatch, subscribe}
}