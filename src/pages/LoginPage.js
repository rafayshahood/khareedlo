import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import '../style/loginPage.scss';
import logo from '../logo.webp'
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onFinish = (values) => {
    dispatch(login({ username: values.username, password: values.password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      message.success('Welcome Back!', 2); // Display welcome message
      setTimeout(() => navigate('/products'), 2000); // Redirect after message
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-page">
      <div className="login-container">


        <div className="login-image">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <Form name="loginForm" onFinish={onFinish}>
        <Typography.Title level={2}>Sign in</Typography.Title>
        <Typography.Title className='signin-sub' level={5}>Enter you credientials to log in</Typography.Title>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
