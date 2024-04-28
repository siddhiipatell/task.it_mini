import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const items1 = [
  {
    key: '1',
    icon: <LaptopOutlined />,
    title: 'To Do List',
    link: '/tasks',
  },
  {
    key: '2',
    icon: <UserOutlined />,
    title: 'Profile',
    link: '/profile',
  } 
];
const Navbar = () => {

  const logout = () => {
    localStorage.removeItem('token');
    window.location.replace('/login');
  }
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          // style={{
          //   flex: 1,
          //   minWidth: 0,
          // }}
        >
          {items1.map((item) => (
            <Menu.Item icon={item.icon}>
               <Link to={item.link} key={item.key}>
              {item.title}
             </Link>
            </Menu.Item>
          ))}
          <Menu.Item key="3" onClick={logout}>
            Logout
            </Menu.Item>
            
        </Menu>
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        
      </Content>     
    </Layout>
  );
};
export default Navbar;