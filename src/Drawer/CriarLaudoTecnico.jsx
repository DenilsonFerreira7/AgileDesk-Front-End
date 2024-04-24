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
import './CSS/laudotecnico.css'; // Importação do arquivo CSS

const CriarLaudoTecnico = () => {
  const [empresas, setEmpresas] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [selectedTecnico, setSelectedTecnico] = useState('');
  const [selectedEquipamentos, setSelectedEquipamentos] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [equipamentosDaEmpresa, setEquipamentosDaEmpresa] = useState([]);

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

  useEffect(() => {
    if (selectedEmpresa) {
      axios.get(`http://localhost:8080/empresa/${selectedEmpresa}/equipamento/consultar`)
        .then(response => {
          setEquipamentosDaEmpresa(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar equipamentos da empresa:', error);
        });
    }
  }, [selectedEmpresa]);

  const handleEmpresaChange = async (e) => {
    const empresaId = e.target.value;
    setSelectedEmpresa(empresaId);
  };

  const handleTecnicoChange = (e) => {
    setSelectedTecnico(e.target.value);
  };

  const handleEquipamentosChange = (e) => {
    setSelectedEquipamentos(e.target.value);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setDescricao(value);
  };

  const handleCadastrarLaudoTecnicoClick = async () => {
    try {
      const data = {
        empresaId: Number(selectedEmpresa),
        tecnicoId: Number(selectedTecnico),
        equipamentoIds: selectedEquipamentos.map(equipamento => equipamento.id),
        descricao: descricao
      };

      const response = await axios.post('http://localhost:8080/pdf/laudoTecnico', data, {
        responseType: 'blob' // Especifica que o tipo de resposta é um blob (PDF)
      });

      if (response.status === 200) {
        // Cria uma URL para o blob PDF
        const pdfUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        // Abre uma nova aba com o URL do PDF
        window.open(pdfUrl);
        // Limpar os campos após o cadastro
        setSelectedEmpresa('');
        setSelectedTecnico('');
        setSelectedEquipamentos([]);
        setDescricao('');
      }
    } catch (error) {
      console.error('Erro ao cadastrar laudo técnico:', error);
    }
  };

  return (
    <Box>
      <Box className="form-box"> {/* Nova div envolvendo todo o formulário */}
        <Typography variant="h4" className="form-title" gutterBottom>
          Criar Laudo Técnico
        </Typography>

        <Box className="form-fields-container">
          <FormControl sx={{ m: 1, minWidth: 300 }} className="inputField">
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

          <FormControl sx={{ m: 1, minWidth: 300 }} className="inputField">
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

          <FormControl sx={{ m: 1, minWidth: 300 }} className="inputField">
            <InputLabel id="equipamentos-label">Selecione os Equipamentos</InputLabel>
            <Select
              labelId="equipamentos-label"
              id="equipamentos"
              multiple
              value={selectedEquipamentos}
              onChange={handleEquipamentosChange}
              input={<OutlinedInput label="Selecione os Equipamentos" />}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Typography key={value.id}>{value.nomeEquipamento}</Typography>
                  ))}
                </div>
              )}
            >
              {equipamentosDaEmpresa.map((equipamento) => (
                <MenuItem key={equipamento.id} value={equipamento}>
                  <Checkbox checked={selectedEquipamentos.some(item => item.id === equipamento.id)} />
                  {equipamento.nomeEquipamento}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 300 }} className="inputField">
            <TextField
              id="descricao"
              name="descricao"
              label="Descrição"
              multiline
              rows={4}
              value={descricao}
              onChange={handleInputChange}
              fullWidth
            />
          </FormControl>

          <Box className="button-container">
            <Button
              type="button"
              onClick={handleCadastrarLaudoTecnicoClick}
              variant="contained"
              endIcon={<SendIcon />}
              className="button"
            >
              Cadastrar Laudo
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CriarLaudoTecnico;
