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
import Pagination from '@mui/material/Pagination';

export default function ConsultarLaudosTecnicos() {
  const [laudos, setLaudos] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [exibirLaudosTecnicos, setExibirLaudosTecnicos] = useState(true);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    const url = exibirLaudosTecnicos ? 'http://localhost:8080/laudo/pdfall' : 'http://localhost:8080/laudo/pdfPreventivaAll';
    axios.get(url)
      .then(response => {
        setLaudos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar laudos:', error);
      });
  }, [exibirLaudosTecnicos]);

  const handlePrintButtonClick = (id) => {
    if (!id || id === "undefined") {
      console.error('ID de laudo inválido');
      return;
    }
    const url = exibirLaudosTecnicos ? `http://localhost:8080/pdf/laudo/${id}` : `http://localhost:8080/pdf/laudoPreventiva/${id}`;
    axios.get(url, { responseType: 'blob' })
      .then(response => {
        const pdfUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        window.open(pdfUrl);
      })
      .catch(error => {
        console.error('Erro ao abrir PDF:', error);
      });
  };

  const handleSearchChange = (event) => {
    setFiltroNome(event.target.value);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const filtrarLaudos = (laudos, filtroNome) => {
    return laudos.filter(laudo =>
      laudo.empresaNome && laudo.empresaNome.toLowerCase().includes(filtroNome.toLowerCase())
    );
  };

  const filtrarLaudosPreventiva = (laudos, filtroNome) => {
    return laudos.filter(laudo =>
      laudo.descricao && laudo.descricao.toLowerCase().includes(filtroNome.toLowerCase())
    );
  };

  // Ordenar os laudos com base na coluna selecionada e na ordem
  const sortedLaudos = laudos.sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    // Verificar se os valores são nulos ou indefinidos
    if (valueA == null || valueB == null) {
      return 0;
    }

    // Verificar se os valores são strings antes de chamar localeCompare
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    } else {
      // Se os valores não são strings, comparar diretamente
      if (sortOrder === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    }
  });

  // Paginação
  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = exibirLaudosTecnicos
    ? filtrarLaudos(sortedLaudos, filtroNome).slice(indexOfFirstRow, indexOfLastRow)
    : filtrarLaudosPreventiva(sortedLaudos, filtroNome).slice(indexOfFirstRow, indexOfLastRow);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <TableContainer component={Paper} className="table-container">
        <Typography variant="h5" align="center" className="table-title">{exibirLaudosTecnicos ? 'Laudos Técnicos' : 'Laudos Preventiva'}</Typography>
        <div className='consultasLaudo' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '24px' }}>
          <TextField
            label="Pesquisar nome da empresa"
            variant="outlined"
            size="small"
            value={filtroNome}
            onChange={handleSearchChange}
            className="search-input" // Use a mesma classe definida no CSS
            style={{ width: '300px' }} // Defina a largura da barra de pesquisa
          />
          <div>
            <Button variant="contained" color="primary" onClick={() => setExibirLaudosTecnicos(true)} className="button-consultar">Consultar Laudo Técnico</Button>
            <Button variant="contained" color="primary" onClick={() => setExibirLaudosTecnicos(false)} className="button-consultar">Consultar Laudo Preventiva</Button>
          </div>
        </div>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header-cell" style={{ whiteSpace: 'nowrap' }} onClick={() => handleSort('id')}>
                N° Laudo {sortColumn === 'id' && sortOrder === 'asc' && '▲'}
                {sortColumn === 'id' && sortOrder === 'desc' && '▼'}
              </TableCell>
              <TableCell align="left" className="table-header-cell" onClick={() => handleSort('empresaNome')}>
                Nome da Empresa {sortColumn === 'empresaNome' && sortOrder === 'asc' && '▲'}
                {sortColumn === 'empresaNome' && sortOrder === 'desc' && '▼'}
              </TableCell>
              <TableCell align="left" className="table-header-cell" onClick={() => handleSort('tecnicoNome')}>
                Nome Técnico {sortColumn === 'tecnicoNome' && sortOrder === 'asc' && '▲'}
                {sortColumn === 'tecnicoNome' && sortOrder === 'desc' && '▼'}
              </TableCell>
              <TableCell align="left" className="table-header-cell" onClick={() => handleSort('descricao')}>
                Descrição {sortColumn === 'descricao' && sortOrder === 'asc' && '▲'}
                {sortColumn === 'descricao' && sortOrder === 'desc' && '▼'}
              </TableCell>
              <TableCell className="table-header-cell" style={{ whiteSpace: 'nowrap' }} onClick={() => handleSort('dataCriacao')}>
                Data de Criação {sortColumn === 'dataCriacao' && sortOrder === 'asc' && '▲'}
                {sortColumn === 'dataCriacao' && sortOrder === 'desc' && '▼'}
              </TableCell>
              <TableCell align="left" className="table-header-cell">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((laudo) => (
              <TableRow key={laudo.id}>
                <TableCell component="th" scope="row">
                  {laudo.id}
                </TableCell>
                <TableCell align="left">{laudo.empresaNome}</TableCell>
                <TableCell align="left">{laudo.tecnicoNome}</TableCell>
                <TableCell align="left" className="table-description-cell" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{laudo.descricao}</TableCell>
                <TableCell>{new Date(laudo.dataCriacao).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<PrintIcon />}
                    onClick={() => handlePrintButtonClick(laudo.id)}
                  >
                    Imprimir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={Math.ceil((exibirLaudosTecnicos ? filtrarLaudos(sortedLaudos, filtroNome).length : filtrarLaudosPreventiva(sortedLaudos, filtroNome).length) / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        />
      </TableContainer>
    </div>
  );
}
