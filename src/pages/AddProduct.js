import React, { useState } from 'react';
import { Form, Input, Button, Upload, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment'; // Import moment for date handling
import { addProduct } from '../features/productsSlice'; // Import addProduct action

const AddProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    const newProduct = {
      id: Date.now(), // Temporary ID, replace with actual ID from the server in a real app
      ...values,
      expiryDate: values.expiryDate.format('YYYY-MM-DD'),
      image: fileList.length > 0 ? fileList[0].url : 'https://via.placeholder.com/50', // Placeholder image if none provided
    };
    dispatch(addProduct(newProduct));
    navigate('/products'); // Redirect after adding
  };

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please input the product name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please input the quantity!' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true, message: 'Please select the expiry date!' }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="image" label="Product Image">
        <Upload
          listType="picture"
          fileList={fileList}
          onChange={handleFileChange}
        >
          <Button>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductPage;
