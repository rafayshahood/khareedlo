import React, { useEffect } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import '../style/LoginPage.scss';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onFinish = (values) => {
    dispatch(login({ username: values.username, password: values.password }));
  };

  // Use useEffect to handle the redirect after authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [isAuthenticated, navigate]); // Only run this effect when isAuthenticated or navigate changes

  return (
    <div className="login-page">
      <Typography.Title level={2}>Login</Typography.Title>
      <Form name="loginForm" onFinish={onFinish}>
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
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
