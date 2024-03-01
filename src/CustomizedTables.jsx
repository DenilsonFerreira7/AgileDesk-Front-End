import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: 'center',
    fontSize: 14,
    width: '25%', // Definindo largura fixa para cada célula
    position: 'sticky', // Tornando o cabeçalho sticky
    top: 0, // Definindo a posição superior para 0
    zIndex: 1000, // Ajustando o índice z para manter acima de outros elementos
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    width: '25%', // Definindo largura fixa para cada célula
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ResponsiveTableContainer = styled(TableContainer)({
  overflowX: 'auto', // Adicionando overflow-x: auto para permitir rolagem horizontal
  height: '500px', // Defina uma altura fixa para a tabela
  '@media (max-width: 412px) and (max-height: 491px)': { // Adicionando regra de mídia para dimensões específicas
    overflowX: 'auto', // Adicionando overflow-x: auto quando a largura e altura forem menores que 412 x 491 pixels
  },
});

const Title = styled('h2')({
  textAlign: 'center',
  margin: '2px 0',
  fontSize: '1.5rem',
  color: '#333',
  fontWeight: 'normal',
});

const empresasData = [
  {
    empresaId: 1,
    nomeEmpresa: 'Empresa A',
    endereco: 'Rua A, 123',
    telefone: '123-456-7890',
  },
  {
    empresaId: 2,
    nomeEmpresa: 'Empresa B',
    endereco: 'Rua B, 456',
    telefone: '987-654-3210',
  },
  {
    empresaId: 3,
    nomeEmpresa: 'Empresa C',
    endereco: 'Rua C, 789',
    telefone: '456-789-0123',
  },
];

export default function ConsultarEmpresasTable() {
  const [empresas, setEmpresas] = useState(empresasData);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [equipamentos, setEquipamentos] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Define a quantidade de linhas por página
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
    axios.get(`http://localhost:8080/empresas/${empresaId}/equipamentos/consultar`)
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Voltar para a primeira página ao alterar o número de linhas por página
    setTotalPages(Math.ceil(equipamentos.length / rowsPerPage));
  };

  return (
    <div>
      {empresaSelecionada && (
        <Paper sx={{ marginBottom: '-60px', padding: '20px', backgroundColor: '#F0F8FF' }}>
          <Title>Detalhes da Empresa</Title>
          {empresas.map((empresa) => {
            if (empresa.empresaId === empresaSelecionada) {
              return (
                <div key={empresa.empresaId}>
                  <p style={{ marginBottom: '10px', fontSize: '1.0rem' }}>Nome: {empresa.nomeEmpresa}</p>
                  <p style={{ marginBottom: '10px', fontSize: '1.0rem' }}>Telefone: {empresa.telefone}</p>
                  <p style={{ marginBottom: '10px', fontSize: '1.0rem' }}>Endereço: {empresa.endereco}</p>
                </div>
              );
            }
          })}
          <Title>Equipamentos Registrados</Title>
          <ResponsiveTableContainer sx={{ minWidth: '100%' }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nome Equipamento</StyledTableCell>
                  <StyledTableCell>Descrição</StyledTableCell>
                  <StyledTableCell>Setor</StyledTableCell> {/* Adicionando célula para o setor */}
                </TableRow>
              </TableHead>
              <TableBody>
                {equipamentos.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((equipamento) => (
                  <StyledTableRow key={equipamento.id}>
                    <StyledTableCell>{equipamento.nomeEquipamento}</StyledTableCell>
                    <StyledTableCell>{equipamento.descricao}</StyledTableCell>
                    <StyledTableCell>{equipamento.setor}</StyledTableCell> {/* Renderizando o setor */}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </ResponsiveTableContainer>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            sx={{ marginTop: '20px', justifyContent: 'center' }}
          />
          <Button onClick={() => setEmpresaSelecionada(null)} variant="contained" color="primary" sx={{ marginTop: '10px' }}>
            Voltar
          </Button>
        </Paper>
      )}
      {!empresaSelecionada && (
        <Paper>
          <Title>Empresas Cadastradas</Title>
          <ResponsiveTableContainer sx={{ minWidth: '100%' }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nome Empresa</StyledTableCell>
                  <StyledTableCell>Endereço</StyledTableCell>
                  <StyledTableCell>Telefone</StyledTableCell>
                  <StyledTableCell>Detalhes</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {empresas.map((empresa) => (
                  <StyledTableRow key={empresa.empresaId}>
                    <StyledTableCell component="th" scope="row">
                      {empresa.nomeEmpresa}
                    </StyledTableCell>
                    <StyledTableCell>{empresa.endereco}</StyledTableCell>
                    <StyledTableCell>{empresa.telefone}</StyledTableCell>
                    <StyledTableCell>
                      <Button onClick={() => handleConsultarClick(empresa.empresaId)} variant="contained" color="primary">
                        Detalhar
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </ResponsiveTableContainer>
        </Paper>
      )}
    </div>
  );
}
