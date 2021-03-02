import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less'
const {Item} = Form;

export default class Login extends Component {
  componentDidMount(){
    console.log(this)
  }
  render() {
    const initialValues =  {remember: false, username: 'admin', password: '123456' }
    return (
      <div className="login_wrap_com">
        <div className="login_header_top"></div>
        <div className="login_main_middle">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={initialValues}
            onFinish={this.onFinish}
          >
            <Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Item>
            <Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
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
        <div className="login_footer_bottom">footer...</div>
      </div>
    )
  }
  onFinish = (data)=>{
    console.log(data)
  }  
}
