import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

export default function CadastrarEmpresa() {
  const [empresaData, setEmpresaData] = useState({
    nomeEmpresa: '',
    telefone: '',
    endereco: '',
  });
  const [alertStatus, setAlertStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmpresaData({
      ...empresaData,
      [name]: value.toUpperCase(),
    });
  };

  const handleCadastrarEmpresaClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/empresa/cadastrar', empresaData);
      if (response.status === 201) {
        setAlertStatus('success');
        setEmpresaData({
          nomeEmpresa: '',
          telefone: '',
          endereco: '',
        });
      } else {
        setAlertStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
      setAlertStatus('error');
    }
    setTimeout(() => {
      setAlertStatus(null);
    }, 5000);
  };

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Typography variant="h4" gutterBottom style={{ fontSize: 'clamp(16px, 5vw, 24px)' }}>
        Cadastre uma nova empresa
      </Typography>
      <TextField
        label="Razão Social"
        name="nomeEmpresa"
        value={empresaData.nomeEmpresa}
        onChange={handleInputChange}
        sx={{ width: '40ch' }}
      />
      <TextField
        label="Telefone"
        name="telefone"
        value={empresaData.telefone}
        onChange={handleInputChange}
        sx={{ width: '40ch' }}
      />
      <TextField
        label="Endereço"
        name="endereco"
        value={empresaData.endereco}
        onChange={handleInputChange}
        sx={{ width: '40ch' }}
      />
      <Button type="button" onClick={handleCadastrarEmpresaClick} variant="contained" endIcon={<SendIcon />}>
        CADASTRAR
      </Button>
      <Slide direction="down" in={alertStatus !== null}>
        <Box sx={{ position: 'fixed', bottom: 16, top: -100, left: '0%', width: '100%', transform: 'translateX(-50%)', zIndex: 999 }}>
          {alertStatus === 'success' && (
            <Alert variant="filled" severity="success">
              Empresa cadastrada com sucesso!
            </Alert>
          )}
          {alertStatus === 'error' && (
            <Alert variant="filled" severity="error">
              Erro ao cadastrar empresa. Por favor, tente novamente.
            </Alert>
          )}
        </Box>
      </Slide>
    </Box>
  );
}
