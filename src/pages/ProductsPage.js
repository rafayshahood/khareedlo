import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { fetchProducts, deleteProduct } from '../features/productsSlice'; // Import deleteProduct action
import TopHeader from '../components/TopHeader';
import '../style/ProductsPage.scss'
const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₨ ${price.toLocaleString('en-PK')}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="product" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => navigate(`/manage-products/${record.id}`)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <TopHeader /> {/* Add TopHeader component */}
      <Button type="primary" onClick={() => navigate('/add-product')} style={{ marginBottom: 16 }}>
        Add New Product
      </Button>
      <Table
        dataSource={products}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ProductListPage;
