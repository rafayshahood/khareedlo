import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, DatePicker } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'; 
import { updateProduct, fetchProducts } from '../features/productsSlice';

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
    const updatedProduct = {
      ...product,
      ...values,
      expiryDate: values.expiryDate.format('YYYY-MM-DD'),
      image: fileList.length > 0 ? fileList[0].url : product.image,
    };
    dispatch(updateProduct(updatedProduct));
    dispatch(fetchProducts()); // Re-fetch products after update
    navigate('/products');  // Redirect after updating
  };
  

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        ...product,
        expiryDate: product ? moment(product.expiryDate) : null,
      }}
    >
      <Form.Item name="name" label="Product Name">
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Price">
        <Input type="number" />
      </Form.Item>
      <Form.Item name="quantity" label="Quantity">
        <Input type="number" />
      </Form.Item>
      <Form.Item name="expiryDate" label="Expiry Date">
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
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductDetailsPage;
