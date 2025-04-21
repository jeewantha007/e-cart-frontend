import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, CircularProgress, IconButton, Collapse
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openRows, setOpenRows] = useState({});

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/orders/user/${userId}`);
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

  const formatCurrency = (value) => `Rs. ${parseFloat(value).toFixed(2)}`;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const toggleRow = (orderId) => {
    setOpenRows((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
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

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
            <TableRow>
              <TableCell />
              <TableCell><strong>No</strong></TableCell>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Payment</strong></TableCell>
              <TableCell><strong>Card Last 4</strong></TableCell>
              <TableCell><strong>Subtotal</strong></TableCell>
              <TableCell><strong>Tax</strong></TableCell>
              <TableCell><strong>Shipping</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order, index) => (
                <React.Fragment key={order.order_id}>
                  <TableRow hover>
                    <TableCell>
                      <IconButton size="small" onClick={() => toggleRow(order.order_id)}>
                        {openRows[order.order_id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{order.payment_method}</TableCell>
                    <TableCell>{order.card_last4 || '-'}</TableCell>
                    <TableCell>{formatCurrency(order.subtotal)}</TableCell>
                    <TableCell>{formatCurrency(order.tax)}</TableCell>
                    <TableCell>{formatCurrency(order.shipping_fee)}</TableCell>
                    <TableCell><strong>{formatCurrency(order.total_amount)}</strong></TableCell>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                      <Collapse in={openRows[order.order_id]} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                          <Typography variant="subtitle1" gutterBottom>
                            Ordered Items
                          </Typography>
                          <Table size="small">
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                              <TableRow>
                                <TableCell><strong>Product</strong></TableCell>
                                <TableCell><strong>Price</strong></TableCell>
                                <TableCell><strong>Qty</strong></TableCell>
                                <TableCell><strong>Total</strong></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {order.items.map((item) => (
                                <TableRow key={item.item_id}>
                                  <TableCell>{item.product_name}</TableCell>
                                  <TableCell>{formatCurrency(item.price)}</TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>{formatCurrency(item.total_price)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
