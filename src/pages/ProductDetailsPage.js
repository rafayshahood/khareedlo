import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, DatePicker, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'; 
import { updateProduct, fetchProducts } from '../slices/productsSlice';
import TopHeader from '../components/topBar';
import '../style/productDetailsPage.scss';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === parseInt(id))
  );

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (product) {
      console.log('Product Details:', product); // Check if quantity and expiryDate are correct
      setFileList([
        {
          uid: '-1',
          name: product.name,
          status: 'done',
          url: product.image,
        },
      ]);
    }
  }, [product]);

  const onFinish = (values) => {
    console.log('onFinish called:', values);
    const updatedProduct = {
      ...product,
      ...values,
      expiryDate: product ? moment(product.expiryDate).format('YYYY-MM-DD') : null,
      image: fileList.length > 0 ? fileList[0].url : product.image,
    };
    message.success('Successfully Updated!', 2); // Display success message
    dispatch(updateProduct(updatedProduct));
    dispatch(fetchProducts());
    navigate('/products');
  };

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  return (
    <div>
      <TopHeader/>
      <div className="product-details-page">
        <h1>Edit Product</h1>
        <Form 
          onFinish={onFinish}
          layout='vertical'
          labelAlign='left'
          size='large'
          initialValues={{
            name: product?.name || '',
            price: product?.price || '',
            quantity: product?.quantity || '',
            expiryDate: product ? moment(product.expiryDate, 'YYYY-MM-DD') : null,
          }}
        >
          <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please input the product name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="quantity" label="Quantity" style={{ display: 'inline-block', width: '45%' }} rules={[{ required: true, message: 'Please input the quantity!' }]}>
            <Input type="number" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="expiryDate" label="Expiry Date" style={{ display: 'inline-block', width: '45%', marginLeft: '10%' }} rules={[{ required: true, message: 'Please select the expiry date!' }]}>
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
            <Button type="primary" htmlType="submit" style={{ width: '30%' }}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
