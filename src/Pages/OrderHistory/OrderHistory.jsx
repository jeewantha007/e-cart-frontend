import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, CircularProgress
} from '@mui/material';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const userId = localStorage.getItem('userId');
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/orders/user/${userId}`);
        console.log('Orders data:', response.data); // For debugging
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchOrders();
    } else {
      setLoading(false);
      setError('User ID not found. Please log in again.');
    }
  }, [userId]);

  // Function to format currency values
  const formatCurrency = (value) => {
    return `Rs. ${parseFloat(value).toFixed(2)}`;
  };

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box p={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Payment Method</strong></TableCell>
              <TableCell><strong>Card Last 4</strong></TableCell>
              <TableCell><strong>Subtotal</strong></TableCell>
              <TableCell><strong>Tax</strong></TableCell>
              <TableCell><strong>Shipping Fee</strong></TableCell>
              <TableCell><strong>Total Amount</strong></TableCell>
              <TableCell><strong>Order Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.payment_method}</TableCell>
                  <TableCell>{order.card_last4 || '-'}</TableCell>
                  <TableCell>{formatCurrency(order.subtotal)}</TableCell>
                  <TableCell>{formatCurrency(order.tax)}</TableCell>
                  <TableCell>{formatCurrency(order.shipping_fee)}</TableCell>
                  <TableCell>{formatCurrency(order.total_amount)}</TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}