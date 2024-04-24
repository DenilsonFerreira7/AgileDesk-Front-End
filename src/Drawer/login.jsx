import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import './CSS/LoginScreen.css';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() === 'admin' && password.trim() === 'password') {
      // Redireciona para a página após o login bem-sucedido
      window.location.href = 'http://localhost:5173/';
    } else {
      alert('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  React.useEffect(() => {
    // Adiciona a classe login-body ao body ao montar o componente
    document.body.classList.add('login-body');
    // Remove a classe login-body ao body ao desmontar o componente
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  return (
    <Box className="login-container">
      <Box className="login-box">
        <Typography variant="h5" gutterBottom className="login-title">
          Login
        </Typography>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Checkbox
            id="remember-me-checkbox"
            color="primary"
            inputProps={{ 'aria-label': 'remember me checkbox' }}
          />
          <Typography variant="body2">Remember me</Typography>
        </Box>
        <Button variant="contained" fullWidth className="login-button" onClick={handleLogin}>
          Entrar
        </Button>
      </Box>
    </Box>
  );
}
