import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

// Sample user data (assuming an array of users)
const users = [
  {
    _id: '1',
    role: 'user',
    loginId: 'john_doe',
    companyName: 'Example Company',
    subscriptionType: 'Premium',
  },
  {
    _id: '2',
    role: 'admin',
    loginId: 'jane_smith',
    companyName: 'Another Company',
    subscriptionType: 'Basic',
  },
  // Add more users as needed
];

export default function User() {

  const handleEdit = (userId) => {
    // Handle edit action (e.g., navigate to edit page)
    console.log(`Edit user with ID: ${userId}`);
  };

  const handleDelete = (userId) => {
    // Handle delete action (e.g., show confirmation dialog)
    console.log(`Delete user with ID: ${userId}`);
  };

  // useEffect(() => {
  //   dispatch(fetchUserData());
  // }, [userAction])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            <TableCell>Login ID</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Subscription Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.loginId}</TableCell>
              <TableCell>{user.companyName}</TableCell>
              <TableCell>{user.subscriptionType}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEdit(user._id)}>Edit</Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(user._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
