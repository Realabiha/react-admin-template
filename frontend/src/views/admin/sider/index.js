import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons';
import menus from '../../../mock/menus';
import { connect } from 'react-redux';
import saveMenuTitle from '../../../redux/actions/saveMenuTitle'
const { SubMenu, Item } = Menu;
class Aside extends Component {
  state = {
    collapsed: false,
  };
  componentDidMount(){
  }
  UNSAFE_componentWillMount(){
    localStorage.removeItem('subMenu');
  }
  render() {
    const {user} = this.props.userInfo;
    const menuTitle = this.props.menuTitle || this.props.location.pathname.split('/').reverse()[0]
    return (
      <div>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={[menuTitle]}
          defaultOpenKeys={JSON.parse(localStorage.getItem('subMenu')) || ['home']}
          mode="inline"
          theme="dark"
          // inlineCollapsed={this.state.collapsed}
          onClick={this.menuItemClicked}
          onOpenChange={this.menuItemOpenChange}
        > 
          {generateMenuJsx(menus, user)}
        </Menu>
      </div>
    );
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  menuItemClicked = ({key}) => {
    this.props.handleMenuClik(key)
  }
  menuItemOpenChange = (keys) => {
    localStorage.setItem('subMenu', JSON.stringify(keys))
  }
}

export default connect(mapStateToProps, mapDispatchToProps())( withRouter(Aside) )

function mapStateToProps(state){
  return {
    userInfo: state.userInfo,
    menuTitle: state.menuTitle
  }
}
function mapDispatchToProps(){
  return {
    handleMenuClik: saveMenuTitle 
  }
}

// helper
function generateMenuJsx(menus, user){
  return menus.map(menu => {
    if( hasAuth(menu, user) ){
      if(menu.children){
        return (
          <SubMenu key={menu.key} icon={<MailOutlined />} title={menu.title}>
            {generateMenuJsx(menu.children, user)}
          </SubMenu>
        )
      }else{
        return (
          <Item key={menu.key} icon={<PieChartOutlined />}>
            <Link to={menu.to}>
                {menu.title}
            </Link>
          </Item>
        )
      }
    }else{
      return null;
    }
  }) 
}

function hasAuth(menu, user){
  try {
    if(user.isAdmin) return true;
    if(menu.children){
      return menu.children.some(m => user.permission.indexOf(m.key) >= 0)
    }else{
      return user.permission.indexOf(menu.key) >= 0;
    }
  } catch (error) {
    return false;
  }
}



