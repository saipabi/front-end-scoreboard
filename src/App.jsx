import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Box,
  Alert,
  CircularProgress,
  InputLabel,

  FormControl
  
} from '@mui/material';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [claimedPoints, setClaimedPoints] = useState(null);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE = 'https://back-end-leaderboard.onrender.com/api/users';

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err.message);
      setMessage('⚠️ Error fetching leaderboard. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setClaimedPoints(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      setMessage('⚠️ User name cannot be empty.');
      return;
    }
    try {
      await axios.post(API_BASE, { name: userName });
      setMessage(`✅ User '${userName}' added successfully!`);
      setUserName('');
      fetchLeaderboard();
    } catch (err) {
      console.error('Error adding user:', err);
      setMessage(err.response?.data?.msg || '⚠️ Error adding user.');
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUser) {
      setMessage('⚠️ Please select a user to claim points.');
      return;
    }
    try {
      const res = await axios.put(`${API_BASE}/${selectedUser}/claim`);
      setClaimedPoints(res.data.pointsClaimed);
      setMessage(`🎯 You claimed ${res.data.pointsClaimed} points for ${res.data.user.name}`);
      fetchLeaderboard();
    } catch (err) {
      console.error('Error claiming points:', err);
      setMessage('⚠️ Error claiming points.');
    }
  };

  return (
    
    
    <Container  maxWidth="md" sx={{
      mt: 4, mb: 4,
      p: 3,
      background: 'linear-gradient(to right, #dce35b, #45b649)',
      borderRadius: '12px',
      boxShadow: 3,
      

      
    }}>
      <Typography variant="h4" gutterBottom align="center">
        🏆 Live Leaderboard
      </Typography>

      {message && (
        <Alert
          severity={message.includes('Error') || message.includes('⚠️') ? 'error' : 'success'}
          sx={{ mb: 3 }}
        >
          {message}
        </Alert>
      )}

      
      <Box
        component="form"
        onSubmit={handleAddUser}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2,
          backgroundColor: 'white',
          borderRadius: 2,
          mb: 3
        }}
      >
        <Typography variant="h6">➕ Add New User</Typography>
        <TextField
          label="User Name"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Add User
        </Button>
      </Box>

      
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: 2,
          p: 2,
          backgroundColor: 'white',
          borderRadius: 2,
          mb: 3
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Select User</InputLabel>
          <Select
            value={selectedUser}
            label="Select User"
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <MenuItem value="">
              <em>-- Select a User --</em>
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClaimPoints}
          disabled={!selectedUser}
          sx={{ minWidth: '150px' }}
        >
          Claim Points
        </Button>
      </Box>

      {/* Leaderboard Table */}
      <Typography variant="h5" align="center" gutterBottom>
        📋 Leaderboard
      </Typography>
      {loading ? (
        <Box display="flex" alignContent="center" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#222' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>🏅 Rank</TableCell>
                <TableCell sx={{ color: 'white' }}>👤 User</TableCell>
                <TableCell sx={{ color: 'white' }}>💯 Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>#{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.totalPoints}</TableCell>
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
      )}
    </Container>
  );
}

export default App;
