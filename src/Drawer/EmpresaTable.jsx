import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Button from '@mui/material/Button';
import './CSS/EmpresaTable.css'; // Importe o arquivo CSS
import EquipamentosTable from './EquipamentosTable'; // Importe o componente EquipamentosTable novamente

export default function EmpresaTable() {
  const [empresas, setEmpresas] = useState([]);
  const [showEquipamentos, setShowEquipamentos] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);

  useEffect(() => {
    // Realiza a requisição para obter os dados das empresas
    axios.get('http://localhost:8080/empresa/todas')
      .then(response => {
        setEmpresas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar empresas:', error);
      });
  }, []);

  const handleDetalhesClick = (empresa) => {
    // Ativa a exibição da tabela de equipamentos para a empresa selecionada
    setSelectedEmpresa(empresa);
    setShowEquipamentos(true);
  }

  const handleConsultarEmpresasOpen = () => {
    // Reseta os estados para exibir a tabela de empresas novamente
    setSelectedEmpresa(null);
    setShowEquipamentos(false);
  };

  return (
    <div>
      {!showEquipamentos && (
        <TableContainer component={Paper} className="table-container"> {/* Adicione a classe "table-container" */}
          <Typography variant="h5" align="center" style={{ marginTop: '20px' }}>Empresas Cadastradas</Typography>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell className="table-header-cell">Nome</TableCell>
                <TableCell align="left" className="table-header-cell">Endereço</TableCell>
                <TableCell align="left" className="table-header-cell">Telefone</TableCell>
                <TableCell align="left" className="table-header-cell">Detalhes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {empresas.map((empresa) => (
                <TableRow key={empresa.empresaId}>
                  <TableCell component="th" scope="row" style={{ }}>
                    {empresa.nomeEmpresa}
                  </TableCell>
                  <TableCell align="left">{empresa.endereco}</TableCell>
                  <TableCell align="left">{empresa.telefone}</TableCell>
                  <TableCell align="left">
                    <Button variant="outlined" color="primary" onClick={() => handleDetalhesClick(empresa)}>Ver Detalhes</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {showEquipamentos && selectedEmpresa && (
        <EquipamentosTable empresaId={selectedEmpresa.empresaId} onClose={() => setShowEquipamentos(false)} />
      )}
    </div>
  );
}
