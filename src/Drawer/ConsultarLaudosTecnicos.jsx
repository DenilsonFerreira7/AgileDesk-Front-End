import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './CSS/EmpresaTable.css';

export default function ConsultarLaudosTecnicos() {
  const [laudos, setLaudos] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/laudo/pdfall')
      .then(response => {
        setLaudos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar laudos técnicos:', error);
      });
  }, []);

  const handlePrintButtonClick = (id) => {
    if (!id || id === "undefined") {
      console.error('ID de laudo inválido');
      return;
    }
    axios.get(`http://localhost:8080/pdf/laudo/${id}`, { responseType: 'blob' })
      .then(response => {
        const pdfUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        window.open(pdfUrl);
      })
      .catch(error => {
        console.error('Erro ao abrir PDF do laudo técnico:', error);
      });
  };

  const handleSearchChange = (event) => {
    setFiltroNome(event.target.value);
  };

  const filtrarLaudos = (laudos, filtroNome) => {
    return laudos.filter(laudo =>
      laudo.empresaNome.toLowerCase().includes(filtroNome.toLowerCase())
    );
  };

  return (
    <div>
      <TextField
  label="Pesquisar nome da empresa"
  variant="outlined"
  size="small"
  value={filtroNome}
  onChange={handleSearchChange}
  className="search-input" // Adicione esta classe
  style={{ marginBottom: '10px', width: '250px' }}
/>
      <TableContainer component={Paper} className="table-container">
        <Typography variant="h5" align="center" style={{ marginTop: '20px' }}>Laudos Técnicos</Typography>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header-cell" style={{ whiteSpace: 'nowrap' }}>N° Laudo</TableCell>
              <TableCell align="left" className="table-header-cell">Nome da Empresa</TableCell>
              <TableCell align="left" className="table-header-cell">Nome Técnico</TableCell>
              <TableCell align="left" className="table-header-cell">Descrição</TableCell>
              <TableCell className="table-header-cell" style={{ whiteSpace: 'nowrap' }}>Data de Criação</TableCell>
              <TableCell align="left" className="table-header-cell">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtrarLaudos(laudos, filtroNome).map((laudo) => (
              <TableRow key={laudo.id}>
                <TableCell>{laudo.id}</TableCell>
                <TableCell>{laudo.empresaNome}</TableCell>
                <TableCell>{laudo.tecnicoNome}</TableCell>
                <TableCell>{laudo.descricao.length > 50 ? `${laudo.descricao.slice(0, 130)}...` : laudo.descricao}</TableCell>
                <TableCell>{laudo.dataCriacao}</TableCell> {/* Exibindo a data de criação */}
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handlePrintButtonClick(laudo.id)}>
                    <PrintIcon /> Imprimir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
