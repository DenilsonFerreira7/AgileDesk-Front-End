import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const MultipleSelectCheckmarks = ({ equipamentos, handleEquipamentosChange }) => {
  const [selectedEquipamentos, setSelectedEquipamentos] = useState([]);

  const handleChange = (event) => {
    setSelectedEquipamentos(event.target.value);
    handleEquipamentosChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-checkbox-label">Equipamentos</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={selectedEquipamentos}
        onChange={handleChange}
        input={<OutlinedInput label="Equipamentos" />}
        renderValue={(selected) => selected.map((equipamento) => equipamento.nome).join(', ')}
      >
        {equipamentos.map((equipamento) => (
          <MenuItem key={equipamento.id} value={equipamento}>
            <Checkbox checked={selectedEquipamentos.some((selected) => selected.id === equipamento.id)} />
            <ListItemText primary={equipamento.nome} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const CriarLaudoTecnico = () => {
  const [empresas, setEmpresas] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [selectedTecnico, setSelectedTecnico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selectedEquipamentos, setSelectedEquipamentos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/empresa/todas')
      .then(response => {
        setEmpresas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar empresas:', error);
      });

    axios.get('http://localhost:8080/tecnico/todos')
      .then(response => {
        setTecnicos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar técnicos:', error);
      });
  }, []);

  const handleEmpresaChange = async (e) => {
    const empresaId = e.target.value;
    setSelectedEmpresa(empresaId);
    try {
      const response = await axios.get(`http://localhost:8080/empresa/${empresaId}/equipamento/consultar`);
      setSelectedEquipamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar equipamentos da empresa:', error);
    }
  };

  const handleTecnicoChange = (e) => {
    setSelectedTecnico(e.target.value);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setDescricao(value);
  };

  const handleEquipamentosChange = (selectedEquipamentos) => {
    setSelectedEquipamentos(selectedEquipamentos);
  };

  const handleCadastrarLaudoTecnicoClick = async () => {
    try {
      const data = {
        empresaId: selectedEmpresa,
        tecnicoId: selectedTecnico,
        equipamentoIds: selectedEquipamentos.map((equipamento) => equipamento.id),
        descricao: descricao
      };

      const response = await axios.post('http://localhost:8080/pdf/laudo', data);

      if (response.status === 200) {
        window.open(URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' })));
      }
    } catch (error) {
      console.error('Erro ao cadastrar laudo técnico:', error);
    }
  };

  return (
    <Box>
      <Box className="form-container">
        <Typography variant="h4" className="form-title" gutterBottom>
          Criar Laudo Técnico
        </Typography>

        <Box className="form-fields-container">
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="empresa-label">Selecione a Empresa</InputLabel>
            <Select
              labelId="empresa-label"
              id="empresa"
              value={selectedEmpresa}
              onChange={handleEmpresaChange}
              input={<OutlinedInput label="Selecione a Empresa" />}
            >
              {empresas.map((empresa) => (
                <MenuItem key={empresa.empresaId} value={empresa.empresaId}>
                  {empresa.nomeEmpresa}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="tecnico-label">Selecione o Técnico</InputLabel>
            <Select
              labelId="tecnico-label"
              id="tecnico"
              value={selectedTecnico}
              onChange={handleTecnicoChange}
              input={<OutlinedInput label="Selecione o Técnico" />}
            >
              {tecnicos.map((tecnico) => (
                <MenuItem key={tecnico.tecnicoId} value={tecnico.tecnicoId}>
                  {tecnico.nomeTecnico}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <MultipleSelectCheckmarks
            equipamentos={selectedEquipamentos}
            handleEquipamentosChange={handleEquipamentosChange}
          />

          <TextField
            id="descricao"
            name="descricao"
            label="Descrição"
            multiline
            rows={4}
            value={descricao}
            onChange={handleInputChange}
            fullWidth
            sx={{ m: 1, minWidth: 300 }}
          />

          <Button
            type="button"
            onClick={handleCadastrarLaudoTecnicoClick}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Cadastrar Laudo
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CriarLaudoTecnico;
