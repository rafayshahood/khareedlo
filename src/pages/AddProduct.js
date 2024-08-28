import React, { useState } from 'react';
import { Form, Input, Button, Upload, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../slices/productsSlice';
import TopHeader from '../components/topBar';
import '../style/addProduct.scss';

const AddProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    const newProduct = {
      id: Date.now(), 
      ...values,
      expiryDate: values.expiryDate.format('YYYY-MM-DD'),
      image: fileList.length > 0 ? fileList[0].url : 'https://via.placeholder.com/50', 
    };
    dispatch(addProduct(newProduct));
    navigate('/products'); 
  };

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  return (
    <div>
      <TopHeader />
      <div className="add-product-page">
        <h1>Add Product</h1>
        <Form 
          layout='vertical'
          labelAlign='left'
          size='large'
          onFinish={onFinish}
        >
          <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please input the product name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please input the quantity!' }]}>
            <Input type="number" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true, message: 'Please select the expiry date!' }]}>
            <DatePicker style={{ width: '100%' }} />
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
            <Button type="primary" htmlType="submit" style={{width:'30%'}}>
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProductPage;