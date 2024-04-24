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
import './CSS/EmpresaTable.css'; // Importe o arquivo CSS

export default function EquipamentosTable({ empresaId, onClose }) {
  const [equipamentos, setEquipamentos] = useState([]);
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    // Realiza a requisição para obter os dados dos equipamentos da empresa
    axios.get(`http://localhost:8080/empresa/${empresaId}/equipamento/consultar`)
      .then(response => {
        setEquipamentos(response.data);
        // Define os dados da empresa com base na primeira entrada dos equipamentos
        if (response.data.length > 0) {
          setEmpresa(response.data[0].empresa);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar equipamentos:', error);
      });
  }, [empresaId]);

  return (
    <TableContainer component={Paper} className="table-container"> {/* Adicione a classe comum */}
      <Table aria-label="customized table">
        <TableHead>
          {/* Cabeçalho com os dados da empresa */}
          {empresa && (
            <TableRow>
              <TableCell colSpan={5} className="company-header" align="left">
                <Typography variant="h6" gutterBottom>{`Nome da Empresa: ${empresa.nomeEmpresa}`}</Typography>
                <Typography variant="h6" gutterBottom>{`Endereço: ${empresa.endereco}`}</Typography>
                <Typography variant="h6" gutterBottom>{`Telefone: ${empresa.telefone}`}</Typography>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell className="table-header-cell">Nome do Tipo</TableCell>
            <TableCell align="left" className="table-header-cell">Descrição</TableCell>
            <TableCell align="left" className="table-header-cell">Setor</TableCell>
            <TableCell align="left" className="table-header-cell">Acesso Remoto</TableCell> {/* Nova célula para Acesso Remoto */}
            <TableCell align="left" className="table-header-cell">Senha Remoto</TableCell> {/* Nova célula para Senha Remoto */}
          </TableRow>
        </TableHead>
        <TableBody>
          {equipamentos && equipamentos.map((equipamento) => (
            <TableRow key={equipamento.id}>
              <TableCell component="th" scope="row">
                {equipamento.tipoEquipamento.nomeEquipamento}
              </TableCell>
              <TableCell align="left">{equipamento.descricao}</TableCell>
              <TableCell align="left">{equipamento.setor}</TableCell>
              <TableCell align="left">{equipamento.acessoRemoto}</TableCell> {/* Dados de Acesso Remoto */}
              <TableCell align="left">{equipamento.senhaRemoto}</TableCell> {/* Dados de Senha Remoto */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <button onClick={onClose}>Voltar</button> {/* Botão para voltar */}
    </TableContainer>
  );
}
