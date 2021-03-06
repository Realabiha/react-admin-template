import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons';
import menus from '../../../mock/menus';
const { SubMenu, Item } = Menu;
export default class Aside extends Component {
  state = {
    collapsed: false,
  };
  componentDidMount(){
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          // inlineCollapsed={this.state.collapsed}
        > 
          {generateMenuJsx(menus)}
        </Menu>
      </div>
    );
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
}

function generateMenuJsx(menus){
  return menus.map(menu => {
    if(menu.children){
      return (
        <SubMenu key={menu.id} icon={<MailOutlined />} title={menu.title}>
          {generateMenuJsx(menu.children)}
        </SubMenu>
      )
    }else{
      return (
        <Item key={menu.id} icon={<PieChartOutlined />}>
          <Link to={menu.to}>
              {menu.title}
          </Link>
        </Item>
      )
    }
  }) 
}
