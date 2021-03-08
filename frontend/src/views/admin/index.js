import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Switch, Redirect, Route } from 'react-router-dom';
import {Layout} from 'antd';
import Head from './header';
import Foot from '../../components/footer';
import Aside from './sider';
import {logoutAction} from '../../redux/actions/loginAction';
import lazyLoad from '../../lazyLoad'
import './index.less';

const {Header, Footer, Sider, Content} = Layout;

class Admin extends Component {
  componentDidMount(){}
  render() {
    return (
      <Layout className="admin_layout_wrap">
        <Sider>
          <Aside></Aside>
        </Sider>
        <Layout>
          <Header>
            <Head></Head>
          </Header>
          <Content>
            <Switch>
              <Route path="/admin/home" component={
                lazyLoad(() => import('../home'))()
              }></Route>
              <Route path="/admin/pro/category" component={
                lazyLoad(() => import('../category'))()
              }></Route>
              <Route path="/admin/pro/product" component={
                lazyLoad(() => import('../product'))()
              }></Route>
              <Route path="/admin/role" component={
                lazyLoad(() => import('../role'))()
              }></Route>
              <Redirect to="/admin/home" />
            </Switch>
          </Content>
          <Footer>
            <Foot />
          </Footer>
        </Layout>
      </Layout>
    )
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