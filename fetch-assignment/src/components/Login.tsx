import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper, CircularProgress
} from '@mui/material';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import img1 from '../assets/dog.png';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error('Name and email are required.');
      return;
    }
    if (name.trim().length < 2 || name.trim().length > 50) {
      toast.error('Name must be between 2 and 50 characters.');
      return;
    }
    if (!validateEmail(email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      await login(name.trim(), email.trim());
      localStorage.setItem('user', name.trim());
      toast.success('Pawfect Login 🐾');
      navigate('/search');
    } catch (err) {
      toast.error('Login failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', bgcolor: '#fefefe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, maxWidth: 400, width: '90%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <img src={img1} alt="Dog logo" style={{ height: 70, marginBottom: 8 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Pawfect Match
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Find your pawfect companion with Fetch 🐕
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            inputProps={{ maxLength: 100 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: '#00B6F1',
              '&:hover': { bgcolor: '#009ed4' },
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none'
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
