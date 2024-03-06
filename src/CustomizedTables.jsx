import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';

const ConsultarEmpresasTable = () => {
  const [empresas, setEmpresas] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [equipamentos, setEquipamentos] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:8080/empresa/todas')
      .then(response => {
        setEmpresas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar empresas:', error);
      });
  }, []);

  const handleConsultarClick = (empresaId) => {
    axios.get(`http://localhost:8080/empresa/${empresaId}/equipamento/consultar`)
      .then(response => {
        setEmpresaSelecionada(empresaId);
        setEquipamentos(response.data);
        setTotalPages(Math.ceil(response.data.length / rowsPerPage));
      })
      .catch(error => {
        console.error('Erro ao buscar equipamentos da empresa:', error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    setTotalPages(Math.ceil(equipamentos.length / newRowsPerPage));
  };

  return (
    <div>
      {empresaSelecionada && (
        <Paper sx={{ marginBottom: '-60px', padding: '15px', backgroundColor: '#F8F8FF', marginLeft: '0px', marginRight: '0px', position: 'relative' }}>
          <h2 style={{ textAlign: 'center', margin: '2px -15px', fontSize: '1.3rem', color: '#FCFCFC', fontWeight: 'normal', backgroundColor: '#3075BA' }}>Detalhes da Empresa</h2>
          {empresas.map((empresa) => (
            empresa.empresaId === empresaSelecionada && (
              <div key={empresa.empresaId}>
                <p style={{ marginBottom: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>Nome: {empresa.nomeEmpresa}</p>
                <p style={{ marginBottom: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>Telefone: {empresa.telefone}</p>
                <p style={{ marginBottom: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>Endereço: {empresa.endereco}</p>
              </div>
            )
          ))}
          <h2 style={{ textAlign: 'center', margin: '2px -15px', fontSize: '1.3rem', color: '#FCFCFC', fontWeight: 'normal', backgroundColor: '#3075BA' }}>Equipamentos Registrados</h2>
          <div style={{ overflowX: 'auto', maxHeight: '400px' }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                 <TableCell align="center" sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Nome Equipamento</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Setor</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Equipamento</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acesso Remoto</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Senha Remoto</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {equipamentos.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((equipamento, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{equipamento.nomeEquipamento}</TableCell>
                    <TableCell align="center">{equipamento.descricao}</TableCell>
                    <TableCell align="center">{equipamento.setor}</TableCell>
                    <TableCell align="center">{equipamento.tipoEquipamento.nomeEquipamento}</TableCell>
                    <TableCell align="center">{equipamento.acessoRemoto}</TableCell>
                    <TableCell align="center">{equipamento.senhaRemoto}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button onClick={() => setEmpresaSelecionada(null)} variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Voltar
          </Button>
        </Paper>
      )}
      {!empresaSelecionada && (
        <Paper style={{ maxHeight: '400px', overflowY: 'auto', marginLeft: '0px', marginRight: '0px', backgroundColor: '#F8F8FF' }}>
          <h2 style={{ textAlign: 'center', margin: '0px 0', fontSize: '1.3rem', color: '#FCFCFC', fontWeight: 'normal', backgroundColor: '#3075BA' }}>Empresas Cadastradas</h2>
          <div style={{ overflowX: 'auto' }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"sx={{ fontWeight: 'bold' }}>Nome Empresa</TableCell>
                  <TableCell align="center"sx={{ fontWeight: 'bold' }}>Endereço</TableCell>
                  <TableCell align="center"sx={{ fontWeight: 'bold' }}>Telefone</TableCell>
                  <TableCell align="center"sx={{ fontWeight: 'bold' }}>Detalhes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {empresas.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((empresa) => (
                  <TableRow key={empresa.empresaId}>
                    <TableCell align="center" component="th" scope="row">{empresa.nomeEmpresa}</TableCell>
                    <TableCell align="center">{empresa.endereco}</TableCell>
                    <TableCell align="center">{empresa.telefone}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleConsultarClick(empresa.empresaId)} variant="contained" color="primary">
                        Detalhar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination
            count={Math.ceil(empresas.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            style={{ marginTop: '20px', justifyContent: 'center', position: 'sticky', bottom: '0', backgroundColor: '#F8F8FF' }}
          />
        </Paper>
      )}
    </div>
  );
};

export default ConsultarEmpresasTable;
