import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Space, Modal } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { fetchProducts, deleteProduct } from '../slices/productsSlice'; // Import deleteProduct action
import TopHeader from '../components/topBar';
import '../style/productsPage.scss'

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const products = useSelector((state) => state.products.items);
  // const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [productIdToDelete, setProductIdToDelete] = React.useState(null);

  const handleDelete = (id) => {
    setProductIdToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProduct(productIdToDelete));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
          <Button type="primary" danger='true' onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <TopHeader /> 
      <div className='body'>
      <h1>Products List</h1>
      <Button type="primary" onClick={() => navigate('/add-product')} style={{ marginBottom: 16 }} className='add-button'>
              Add New Product
      </Button>
      <Table
        dataSource={products}
        columns={columns}
        // loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={true}
        size='large'
        className='table'
        
      />

        <Modal
          title="Confirm Delete"
          open={isModalOpen}
          onOk={handleConfirmDelete}
          onCancel={handleCancel}
        >
          <p>Are you sure you want to delete this product?</p>
        </Modal>
      </div>
    </div>
  );
};

export default ProductListPage;
