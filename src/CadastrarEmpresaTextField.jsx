import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#6F7E8C',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });

export default function CadastrarEmpresaTextField() {
  const outerTheme = useTheme();
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
      [name]: value,
    });
  };

  const handleCadastrarEmpresaClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/empresa/cadastrar', empresaData);
      if (response.status === 201) {
        setAlertStatus('success');
        // Limpar os campos após o sucesso do cadastro
        setEmpresaData({
          nomeEmpresa: '',
          telefone: '',
          endereco: '',
        });
      } else {
        // Lidar com erros de requisição
        setAlertStatus('error');
      }
    } catch (error) {
      // Lidar com erros de conexão ou outros erros
      console.error('Erro ao enviar requisição:', error);
      setAlertStatus('error');
    }
    // Após 5 segundos, limpar o estado de alerta
    setTimeout(() => {
      setAlertStatus(null);
    }, 5000);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
      }}
    >
      <Typography variant="h4" gutterBottom style={{ fontSize: 'clamp(16px, 5vw, 24px)' }}>
        Cadastre uma nova empresa
      </Typography>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          label="Razão Social"
          variant="filled"
          name="nomeEmpresa"
          value={empresaData.nomeEmpresa}
          onChange={handleInputChange}
        />
        <TextField
          label="Telefone"
          variant="filled"
          name="telefone"
          value={empresaData.telefone}
          onChange={handleInputChange}
        />
        <TextField
          label="Endereço"
          variant="filled"
          name="endereco"
          value={empresaData.endereco}
          onChange={handleInputChange}
        />
 <Button type="button" onClick={handleCadastrarEmpresaClick} variant="contained" endIcon={<SendIcon />}>
  CADASTRAR
</Button>
      </ThemeProvider>
      <Slide direction="down" in={alertStatus !== null}>
        <Box sx={{ 
         position: 'fixed',
         bottom: 16,
         top:-100,
         left: '0%',
         width: '100%',
         transform: 'translateX(-50%)',
         zIndex: 999 
         }}>
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
