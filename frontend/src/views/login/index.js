import React, { Component } from 'react';
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { loginAction } from '../../actions/loginAction'
import { getUserList } from '../../apis/index';
import Footer from '../../components/footer'
import './index.less'
const {Item} = Form;

class Login extends Component {
  componentDidMount(){}
  render() {
    const {userInfo: {isLogin}} = this.props;
    const initialValues =  {remember: false, email: '', password: '' }

    if(isLogin) return <Redirect to="/admin" />
    return (
      <div className="login_div_wrap">
        <div className="login_header_top"></div>
        <div className="login_main_middle">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={initialValues}
            onFinish={this.onFinish}
          >
            <Item
              name="email"
              rules={[
                { required: true, message: '请输入用户名' },
                { min: 5, message: '用户名至少5位'},
                { max: 10, message: '用户名至少10位'},
                { whitespace: true, message: '用户名不能为空'},
                { pattern: /\w+/g, message: '用户名只能是字母、数字和下划线'}
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Item>
            <Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { validator: this.pwdValidator}
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Item>
          </Form>
        </div>
        <div className="login_footer_bottom">
          <Footer />
        </div>
      </div>
    )
  }
  // 自定义密码校验
  pwdValidator = async (rule, value) => {
    if(!value){
      throw Error('密码不能为空')
    }else if(value.length < 5){
      throw Error('密码至少5位')
    }else if(/\W+/g.test(value)){
      throw Error('密码只能是字母、数字和下划线')
    }
  }
  // 表单校验成功
  onFinish = (data)=>{
    console.log(this.props.handleLogin);
    this.props.handleLogin(data)
  }  
}
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(Login)

function mapStateToProps(state){
  return {userInfo: state.userInfo};
}
function mapDispatchToProps(dispatch, props){
  return {
    handleLogin: loginAction
  }
}
