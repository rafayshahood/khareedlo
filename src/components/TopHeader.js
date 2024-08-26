// import React from 'react';
// import { Layout, Button, Typography } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../features/authSlice'; // Import logout action
// import '../style/TopHeader.scss'; // Import SCSS file for custom styles

// const { Header } = Layout;
// const { Text } = Typography;

// const TopHeader = () => {
//   const dispatch = useDispatch();
//   const username = useSelector((state) => state.auth.user?.username); // Fetch username from Redux store

//   const handleLogout = () => {
//     dispatch(logout()); // Dispatch logout action
//   };

//   return (
//     <Header className="top-header">
//       <div className="header-content">
//         <Text className="username">Welcome, {username}</Text>
//         <Button type="primary" onClick={handleLogout} className="logout-button">
//           Logout
//         </Button>
//       </div>
//     </Header>
//   );
// };

// export default TopHeader;
