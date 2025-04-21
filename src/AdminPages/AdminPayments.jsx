import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TextField,
} from '@mui/material';
import axios from 'axios';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch payment records from backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/orders/payments')
      .then((res) => {
        setPayments(res.data);
        setFilteredPayments(res.data);
      })
      .catch((err) => console.error('Error fetching payments:', err));
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  
    // Filter payments by payment_id, order_id, or user_id
    const filtered = payments.filter(
      (payment) =>
        payment.payment_id.toString().includes(term) ||
        payment.order_id.toString().includes(term) 
       
    );
  
    setFilteredPayments(filtered);
  };
  

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Payment Records
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Payment ID or Order ID"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ width: '20%', marginBottom: 2 }}
      />

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1e1e2f' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>No</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Payment ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Order ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Payment Method</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Card Holder</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Card Last 4</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Paid Amount</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Paid At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment, index) => (
                <TableRow
                  key={payment.payment_id || index}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                    '&:hover': { backgroundColor: '#f1f1f1' },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{payment.payment_id}</TableCell>
                  <TableCell>{payment.order_id}</TableCell>
                  <TableCell>{payment.user_id}</TableCell>
                  <TableCell>{payment.payment_method}</TableCell>
                  <TableCell>{payment.card_holder || 'N/A'}</TableCell>
                  <TableCell>{payment.card_last4 || 'N/A'}</TableCell>
                  <TableCell>{payment.payment_status}</TableCell>
                  <TableCell>{payment.paid_amount}</TableCell>
                  <TableCell>{new Date(payment.paid_at).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No payment records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
