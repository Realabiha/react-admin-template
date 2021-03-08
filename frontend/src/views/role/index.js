import React, { Component } from 'react';
import {Card, Form, Input, Button, Tree, Table, Modal, Switch, message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import menus from '../../mock/menus'
import {userRegister, getUserList, userUpdate, userDelete} from '../../apis'
import './index.less'

const {Item} = Form;

const initialRules = [
  { required: true, message: '请输入用户名' },
  { whitespace: true, message: '用户名不能为空'}
];
const formLayout = {
  style: {
    width: '500px',
    margin: '0 auto'
  }
}
let isAdd = false, permission = [], userId = '';

export default class Role extends Component {
  formRef = React.createRef();
  state = {
    showModal: false,
    // 只有初始化以及重置时生效
    initialValues:  {
      remember: false, 
      email: '', 
      password: '', 
      isAdmin: false,
      permission: []
    },
    dataSource: [],
    columns: [
      {
        title: '姓名',
        dataIndex: 'email',
        key: 'name',
      },
      {
        title: '超管',
        dataIndex: 'isAdmin',
        key: 'isAdmin',
        render: (row) => {
          return <Switch disabled defaultChecked={row}></Switch>
        }
      },
      {
        title: '操作',
        key: 'operation',
        render: (row) => {
          return (
            <React.Fragment>
              <Button type="primary" disabled={row.isAdmin} onClick={() => this.handleEditUser(row)}>修改</Button>
              <Button type="danger" disabled={row.isAdmin} onClick={() => this.handleDeleteUser(row)}>删除</Button>
            </React.Fragment>
             
          )
        }
      }
    ]
  }
  componentDidMount(){
    this.getUserList();
  }
  render() {
    return (
      <Card 
        title="权限管理" 
        extra={
        <Button type="primary" onClick={this.handleAddUser}>
          <UserOutlined />
          <span>添加</span>
        </Button>} 
      >
        <Table 
          loading={this.state.dataSource.length}
          dataSource={this.state.dataSource} 
          columns={this.state.columns} 
        /> 
        <Modal 
          title="Basic Modal" 
          visible={this.state.showModal}
          width='650px'
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
        >
          <Form
            ref={this.formRef}
            name="normal_login"
            className="login-form"
            initialValues={this.state.initialValues}
            {...formLayout}
          >
            <Item
              name="email"
              rules={initialRules}
            >
              <Input 
                value={this.state.initialValues.email}
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="用户名" 
              />
            </Item>
            <Item
              name="password"
              rules={initialRules}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Item>
            <Item name="isAdmin">
              <Switch disabled defaultChecked={this.state.initialValues.isAdmin}></Switch>
            </Item>
            <Item
              name="permission"
            >
              <Tree 
                checkable
                treeData={menus}
                onCheck={this.onCheck}
                defaultCheckedKeys={this.state.initialValues.permission}
              />
            </Item>
          </Form>          
        </Modal>
      </Card>
    )
  }
  onCheck = (keys) => {
    permission = keys;
  }
  handleEditUser = (row) => {
    console.log(row);
    isAdd = false;
    userId = row.key;
    this.setState({showModal: true, initialValues: {...row}}, () => {
      setTimeout(() => {
        this.formRef.current.resetFields()
      })
    })
  }
  handleAddUser = () => {
    isAdd = true;
    this.setState({
      showModal: true,
      initialValues: {
        email: '', 
        password: '', 
        isAdmin: false,
        permission: [], 
        remember: false
      }
    }, () => {
      setTimeout(() => {
        this.formRef.current.resetFields()
      })
    })
  }
  handleDeleteUser = async (row) => {
    const res = await userDelete(row.key);
    if(res.status === '1'){
      this.getUserList()
      return message.success(res.msg, 1);
    } 
    message.error(res.msg, 1);
  }
  handleModalOk = async () => {
    const {email, password} = this.formRef.current.getFieldValue();
    let res
    if(isAdd){
      res = await userRegister({email, password, permission})
    }else{
      res = await userUpdate({email, password, permission, userId});
    }
    if(res.status === '1'){
      this.setState({
        showModal: false,
      }, () => {
        this.getUserList()
      });
    }
    message.success(res.msg)
  }
  handleModalCancel = () => {
    this.setState({showModal: false});
  }


  // ajax
  getUserList = async () => {
    const res = await getUserList();
    if(res.status === '1'){
      this.setState({
        dataSource: res.data.map(
          item => ({
            key: item._id, 
            email: item.email, 
            password: item.password, 
            isAdmin: item.isAdmin,
            permission: item.permission
          })
        )
      })
    }else{
      message.error(res.msg, 1);      
    }
  }
}
