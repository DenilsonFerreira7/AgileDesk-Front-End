import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TecnicoPopup from './TecnicoPopup'; // Importe o componente de popup
import './CSS/stylesCards.css';

const TecnicoList = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [selectedTecnico, setSelectedTecnico] = useState(null); // Estado para o técnico selecionado
  const [popupOpen, setPopupOpen] = useState(false); // Estado para controlar se o popup está aberto

  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/tecnico/todos');
        setTecnicos(response.data);
      } catch (error) {
        console.error('Erro ao buscar técnicos:', error);
      }
    };
    fetchTecnicos();
  }, []);

  const handleUpdateClick = (tecnico) => {
    setSelectedTecnico(tecnico); // Define o técnico selecionado
    setPopupOpen(true); // Abre o popup
  };

  const handleClosePopup = () => {
    setSelectedTecnico(null); // Limpa o técnico selecionado ao fechar o popup
    setPopupOpen(false); // Fecha o popup
  };

  return (
    <div className="tecnicosContainer">
      <Grid container spacing={3} justifyContent="flex-start" paddingX={3}>
        {tecnicos.map((tecnico) => (
          <Grid item key={tecnico.tecnicoId} xs={12} sm={6} md={4} lg={3}>
            <Card className="card">
              <div className="cardContent">
                <Typography variant="h5" component="h2">
                  {tecnico.nomeTecnico}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {tecnico.cargoTecnico}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Email:</strong> {tecnico.email}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Telefone:</strong> {tecnico.telefone}
                </Typography>
              </div>
              <img className="cardImage" src={`http://localhost:8080${tecnico.fotoPerfil}`} alt={tecnico.nomeTecnico} />
              <Button
                onClick={() => handleUpdateClick(tecnico)}
                variant="contained"
                style={{ fontSize: '9px', backgroundColor: 'green', color: 'white' }}
              >
                Atualizar
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Renderizar o popup apenas se o estado popupOpen for verdadeiro */}
      {popupOpen && (
        <TecnicoPopup
          tecnico={selectedTecnico}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default TecnicoList;
