import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import axios from 'axios';

const CadastroEmpresaForm = ({ onSubmit }) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [alertStatus, setAlertStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/empresa/cadastrar', {
        nomeEmpresa: nome,
        endereco,
        telefone
      });

      if (response.status === 201) {
        setAlertStatus('success');
        setNome('');
        setEndereco('');
        setTelefone('');
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
    <div className="formContainer move-left">
      <div className="formBox" 
      style={{ 
      backgroundColor: '#fff', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), -4px 0 6px rgba(0, 0, 0, 0.1)', 
      padding: '20px',
      borderRadius: '15px' 
      }}>
        <Slide direction="down" in={alertStatus !== null}>
          <div style={{ position: 'fixed', top: '25%', left: '45%', zIndex: 999 }}>
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
          </div>
        </Slide>
        <div className="centeredContent">
          <Typography variant="h4" gutterBottom style={{ marginTop: 0 }}>
            Cadastrar Empresa
          </Typography>
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              className="textField"
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              className="textField"
              label="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              className="textField"
              label="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button className="button" type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroEmpresaForm;
