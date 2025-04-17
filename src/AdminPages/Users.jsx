import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/user/getAll');
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  
  console.log(users);
  
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Users
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table aria-label="users table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1e1e2f', color: 'white' }}>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' , color: 'white' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' , color: 'white'}}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'white' }}>Contact Number</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow 
                  key={user.id || user._id}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' }, // striped rows
                    '&:hover': { backgroundColor: '#f1f1f1' }, // hover effect
                  }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.contact_no || 'N/A'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
