import React from 'react';
import { Layout, Typography, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import '../style/components/topBar.scss';

const { Header } = Layout;
const { Text } = Typography;

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.user?.username);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Header className="top-bar">
        <Text className="username">Welcome, {username}</Text>
        <Space>
          <LogoutOutlined onClick={handleLogout} className="logout-icon" />
        </Space>
    </Header>
  );
};

export default TopBar;
