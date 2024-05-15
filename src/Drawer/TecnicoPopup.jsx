import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

const TecnicoPopup = ({ tecnico, onClose, onTecnicoUpdatedLocally }) => {
  const [nomeTecnico, setNomeTecnico] = useState(tecnico.nomeTecnico);
  const [cargoTecnico, setCargoTecnico] = useState(tecnico.cargoTecnico);
  const [email, setEmail] = useState(tecnico.email);
  const [telefone, setTelefone] = useState(tecnico.telefone);
  const [fotoPerfil, setFotoPerfil] = useState(null); // Definindo a variável fotoPerfil

  const handleUpdateTecnico = async () => {
    try {
      const formData = new FormData();
      formData.append('nomeTecnico', nomeTecnico);
      formData.append('cargoTecnico', cargoTecnico);
      formData.append('email', email);
      formData.append('telefone', telefone);
      
      // Se uma nova foto de perfil foi selecionada, adicione ao formData
      if (fotoPerfil) {
        formData.append('fotoPerfil', fotoPerfil);
      }
  
      const response = await axios.put(`http://localhost:8080/tecnico/${tecnico.tecnicoId}/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Se a atualização for bem-sucedida, atualize os dados localmente
      if (onTecnicoUpdatedLocally && typeof onTecnicoUpdatedLocally === 'function') {
        onTecnicoUpdatedLocally(response.data);
      }
      onClose(); // Fecha o popup
    } catch (error) {
      console.error('Erro ao atualizar técnico:', error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Atualizar Técnico</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome"
          fullWidth
          value={nomeTecnico}
          onChange={(e) => setNomeTecnico(e.target.value)}
        />
        <TextField
          label="Cargo"
          fullWidth
          value={cargoTecnico}
          onChange={(e) => setCargoTecnico(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Telefone"
          fullWidth
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        {/* Adicione um campo de entrada para a nova foto de perfil, se desejar */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleUpdateTecnico} color="primary" type="button">Atualizar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TecnicoPopup;
