import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import { message } from 'antd'
import {logoutAction} from '../../actions/loginAction'
import { getUserList } from '../../apis';
class Admin extends Component {
  componentDidMount(){
    console.log(this.props);
  }
  render() {
    const {userInfo, handleLogout} = this.props;
    if(!userInfo.isLogin) return <Redirect to="/login" />
    return (
      <div className="admin_div_wrap">
        <button onClick={handleLogout}>退出登录</button>
        <button onClick={this.getUserList}>获取用户列表</button>
      </div>
    )
  }
  getUserList = async _ => {
    const res = await getUserList();
    if(res.status === '005'){
      message.warn(res.msg, 1, _ => this.props.handleLogout())
    }
  }
}
function mapStateToProps(state){
  return {
    userInfo: state.userInfo
  }  
}
function mapDispatchToProps(dispatch, props){
  return {
    handleLogout: logoutAction
  }
}
export default connect(
  mapStateToProps, 
  mapDispatchToProps()
)(Admin)