import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom';
import {Button, Modal} from 'antd';
import {LoginOutlined} from '@ant-design/icons';
import {logoutAction} from '../../../redux/actions/loginAction'
import {getUserList} from '../../../apis'
import './index.less';

const {confirm} = Modal;

class Head extends Component {
  componentDidMount(){
  }
  render() {
    const {user, isLogin} = this.props.userInfo;
    const {menuTitle, location} = this.props;
    if(!isLogin) return <Redirect to="/login" />
    return (
      <div className="admin_header_wrap">
        <div className="admin_header_left">{menuTitle || location.pathname}</div>
        <div className="admin_header_right">
          <span className="admin_header_user">欢迎您，{user.email}！</span>
          <Button onClick={this.onLogout}>
            <LoginOutlined />
          </Button>
        </div>
      </div>
    )
  }
  onLogout = () => {
    const {handleLogout} = this.props;
    confirm({
      icon: <LoginOutlined />,
      content: '确认退出吗？',
      onOk() {
        handleLogout();
      },
      onCancel(){
        // 测试token
        getUserList()  
      }
    })
    setTimeout(destroyAllModal, 5000) 
  }
}
export default connect(mapStateToProps, mapDispatchToProps())( withRouter(Head) )

// helper
function mapStateToProps(state){
  return {
    userInfo: state.userInfo,
    menuTitle: state.menuTitle
  }
}
function mapDispatchToProps(dispatch, props){
  // return {
  //   handleLogout(){
  //     dispatch(logoutAction())
  //   }
  // }
  return {
    handleLogout: logoutAction
  }
}
function destroyAllModal(){
  Modal.destroyAll();
}