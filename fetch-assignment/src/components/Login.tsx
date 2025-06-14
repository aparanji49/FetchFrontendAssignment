import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import img1 from "../assets/dog.png";

const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const nameInputRef = useRef<HTMLInputElement>(null);
  // const validateEmail = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const validateInputs = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


    if (!trimmedName || !trimmedEmail) {
      toast.error("Name and email are required");
      return false;
    }
    if (trimmedName.length < 2 || trimmedName.length > 50) {
      toast.error("Name must be between 2 and 50 characters");
      return false;
    }
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return { trimmedName, trimmedEmail };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const inputsValidated = validateInputs();
    if (!inputsValidated) return;

    try {
      setLoading(true);
      const {trimmedName, trimmedEmail} = inputsValidated;
      await login(trimmedName, trimmedEmail);
      localStorage.setItem("fetch_username", trimmedName);
      toast.success("Pawfect Login 🐾");
      navigate("/search");
    } catch (err) {
      toast.error("Login failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#fefefe",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
      component="section"
        elevation={6}
        sx={{ p: 4, borderRadius: 4, maxWidth: 400, width: "90%" }}
        role="form"
        aria-label="Login Form"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <img
            src={img1}
            alt="Dog logo"
            style={{ height: 70, marginBottom: 8 }}
          />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Pawfect Match
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Find your pawfect companion with Fetch 🐕
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            inputRef={nameInputRef}
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            inputProps={{ maxLength: 50, 'aria-label':'Name Input Field' }}
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            inputProps={{ maxLength: 100, 'aria-label': 'Email input field' }}
            disabled={loading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "#000000",
              color: "#fff",
              "&:hover": { bgcolor: "#333333" },
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
