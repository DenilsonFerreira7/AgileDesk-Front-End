import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import './CSS/stylesTextField.css'; // Importe o arquivo CSS


const CadastroTecnicoForm = () => {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [alertStatus, setAlertStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/tecnico/cadastrar', {
        nomeTecnico: nome,
        cargoTecnico: cargo,
        email,
        telefone
      });

      if (response.status === 201) {
        setAlertStatus('success');
        setNome('');
        setCargo('');
        setEmail('');
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
      <div className="formBox">
        <Slide direction="down" in={alertStatus !== null}>
          <div style={{ position: 'fixed', top: '25%', left: '45%', zIndex: 999 }}>
            {alertStatus === 'success' && (
              <Alert variant="filled" severity="success">
                Técnico cadastrado com sucesso!
              </Alert>
            )}
            {alertStatus === 'error' && (
              <Alert variant="filled" severity="error">
                Erro ao cadastrar técnico. Por favor, tente novamente.
              </Alert>
            )}
          </div>
        </Slide>
        <div className="centeredContent">
          <Typography variant="h4" gutterBottom>
            Cadastrar Técnico
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
              label="Cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              className="textField"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default CadastroTecnicoForm;
