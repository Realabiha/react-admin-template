import React, { Component } from 'react';
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less'
const {Item} = Form;

export default class Login extends Component {
  componentDidMount(){
    console.log(this)
  }
  render() {
    const initialValues =  {remember: false, username: '', password: '' }
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
              rules={[
                { required: true, message: '请输入用户名' },
                { min: 5, message: '用户名至少5位'},
                { max: 10, message: '用户名至少10位'},
                {whitespace: true, message: '用户名不能为空'},
                { pattern: /\W+/g, message: '用户名只能是字母、数字和下划线'}
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
        <div className="login_footer_bottom">footer...</div>
      </div>
    )
  }
  pwdValidator = (rule, value, callback) => {
    if(!value){
      callback('密码不能为空')
    }else if(value.length < 5){
      callback('密码至少5位')
    }else if(/\W+/g.test(value)){
      callback('密码只能是字母、数字和下划线')
    }
    callback();
  }
  onFinish = (data)=>{
    console.log(data)
  }  
}
