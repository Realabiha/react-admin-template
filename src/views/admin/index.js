import React, { Component } from 'react'
import {connect} from 'react-redux'
import {testActionType, 
  testActionTypeAsync, 
  testActionTypeAsyncOver, 
  testActionTypeAsync1
} from '../../actions/testAction'
class Admin extends Component {
  componentDidMount(){
    console.log(this.props);
  }
  render() {
    const {test,syncAction,asyncAction,asyncAction1} = this.props;
    return (
      <div>
        <h1 onClick={() => {syncAction()}}>syncAction</h1>
        <h1 onClick={() => {asyncAction()}}>asyncAction</h1>
        <h1 onClick={(e) => {asyncAction1(e)}}>asyncAction1</h1>
        <h1>
          {test}
        </h1>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    test: state.test
  }  
}
function mapDispatchToProps(dispatch, props){
  return {
    syncAction: function(){
      dispatch(testActionType);
    },
    asyncAction: function(){
      setTimeout(function(){
        dispatch(testActionTypeAsync)
        setTimeout(function(){
          dispatch(testActionTypeAsyncOver)
        }, 500)
      })
    },
    asyncAction1: function(e){
      dispatch(testActionTypeAsync1(e))
    }
  }
}
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Admin)