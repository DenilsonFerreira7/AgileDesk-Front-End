import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import './CSS/CadastrarEquipamentoForm.css'; // Importação do arquivo CSS

const CadastrarEquipamentos = () => {
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [selectedSetor, setSelectedSetor] = useState('');
  const [selectedTipoEquipamento, setSelectedTipoEquipamento] = useState('');
  const [selectedTipoEquipamentoId, setSelectedTipoEquipamentoId] = useState('');
  const [selectedCPU, setSelectedCPU] = useState('');
  const [selectedMemoriaRAM, setSelectedMemoriaRAM] = useState('');
  const [selectedSistemaOperacional, setSelectedSistemaOperacional] = useState('');
  const [equipamentoData, setEquipamentoData] = useState({
    nomeEquipamento: '',
    descricao: '',
    acessoRemoto: '',
    senhaRemoto: ''
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [temAcessoRemoto, setTemAcessoRemoto] = useState(false);
  const [tiposEquipamento, setTiposEquipamento] = useState([]);

  const opcoesCPU = ['CELERON', 'I3', 'I5', 'I7'];
  const opcoesMemoriaRAM = ['2', '4', '6', '12', '16', '32'];
  const opcoesSistemaOperacional = ['WIN7', 'WIN8', 'WIN10', 'WIN11'];

  useEffect(() => {
    axios.get('http://localhost:8080/TipoEquipamento/todas')
      .then(response => {
        setTiposEquipamento(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar tipos de equipamento:', error);
      });

    axios.get('http://localhost:8080/empresa/todas')
      .then(response => {
        setEmpresas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar empresas:', error);
      });
  }, []);

  useEffect(() => {
    atualizarDescricao();
  }, [selectedTipoEquipamento, selectedCPU, selectedMemoriaRAM, selectedSistemaOperacional]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEquipamentoData({
      ...equipamentoData,
      [name]: value.toUpperCase(),
    });
  };

  const handleCPUMudanca = (e) => {
    const cpuSelecionada = e.target.value;
    setSelectedCPU(cpuSelecionada.toUpperCase());
  };

  const handleMemoriaRAMMudanca = (e) => {
    const memoriaRAMSelecionada = e.target.value;
    setSelectedMemoriaRAM(memoriaRAMSelecionada.toUpperCase());
  };

  const handleSistemaOperacionalMudanca = (e) => {
    const sistemaOperacionalSelecionado = e.target.value;
    setSelectedSistemaOperacional(sistemaOperacionalSelecionado.toUpperCase());
  };

  const handleTipoEquipamentoChange = (e) => {
    const selectedTipo = e.target.value;
    setSelectedTipoEquipamento(selectedTipo);
    const selectedTipoId = tiposEquipamento.find(tipo => tipo.nomeEquipamento === selectedTipo)?.tipoEquipamentoId;
    setSelectedTipoEquipamentoId(selectedTipoId);
  };

  const atualizarDescricao = () => {
    let descricao = '';
    if (selectedTipoEquipamento === 'COMPUTADOR' || selectedTipoEquipamento === 'NOTEBOOK') {
      descricao = `CPU: ${selectedCPU} | Memória RAM: ${selectedMemoriaRAM} | SO: ${selectedSistemaOperacional}`;
    }
    setEquipamentoData({
      ...equipamentoData,
      descricao: descricao,
    });
  };

  const limparCampos = () => {
    setSelectedEmpresa('');
    setSelectedTipoEquipamento('');
    setSelectedTipoEquipamentoId('');
    setSelectedCPU('');
    setSelectedMemoriaRAM('');
    setSelectedSistemaOperacional('');
    setSelectedSetor('');
    setEquipamentoData({
      nomeEquipamento: '',
      descricao: '',
      acessoRemoto: '',
      senhaRemoto: ''
    });
  };

  const handleCadastrarEquipamentoClick = async () => {
    try {
      if (!selectedEmpresa || !selectedTipoEquipamentoId || !selectedSetor) {
        exibirAlerta('Selecione uma empresa, um tipo de equipamento e um setor.', 'error');
        return;
      }
  
      const dataToSend = {
        nomeEquipamento: equipamentoData.nomeEquipamento,
        setor: selectedSetor,
        descricao: equipamentoData.descricao,
        acessoRemoto: equipamentoData.acessoRemoto,
        senhaRemoto: equipamentoData.senhaRemoto
      };
  
      const response = await axios.post(`http://localhost:8080/empresa/${selectedEmpresa}/equipamento/cadastrar?tipoEquipamentoId=${selectedTipoEquipamentoId}`, dataToSend);
  
      limparCampos();
  
      exibirAlerta('Equipamento cadastrado com sucesso!', 'success');
    } catch (error) {
      exibirAlerta('Erro ao cadastrar equipamento.', 'error');
      console.error('Erro ao cadastrar equipamento:', error);
    }
  };
  
  const exibirAlerta = (mensagem, severidade) => {
    setAlertMessage(mensagem);
    setAlertSeverity(severidade);
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 5000);
  };

  const theme = useTheme();

  return (
    <Box sx={{
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(3),
      boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), -4px 0 6px rgba(0, 0, 0, 0.1)`
    }}>
      <Typography variant="h5" className="form-title" gutterBottom>
        Cadastre um novo equipamento
      </Typography>

      <form className="form-fields-container">
        <TextField
          id="setor"
          name="setor"
          label="Setor"
          value={selectedSetor}
          onChange={(e) => setSelectedSetor(e.target.value)}
          sx={{ width: '100%' }}
        />
        <TextField id="nomeEquipamento" name="nomeEquipamento" label="Nome do Equipamento" value={equipamentoData.nomeEquipamento} onChange={handleInputChange} sx={{ width: '100%' }} />
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="demo-multiple-name-label">Selecione a Empresa</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={selectedEmpresa}
            onChange={(e) => setSelectedEmpresa(e.target.value)}
            input={<OutlinedInput label="Selecione a Empresa" />}
          >
            {empresas.map((empresa) => (
              <MenuItem key={empresa.empresaId} value={empresa.empresaId}>
                {empresa.nomeEmpresa}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="tipo-equipamento-label">Selecione o Tipo de Equipamento</InputLabel>
          <Select
            labelId="tipo-equipamento-label"
            id="tipo-equipamento"
            value={selectedTipoEquipamento}
            onChange={handleTipoEquipamentoChange}
            input={<OutlinedInput label="Selecione o Tipo de Equipamento" />}
          >
            <MenuItem value="">Selecione...</MenuItem>
            {tiposEquipamento.map((tipo) => (
              <MenuItem key={tipo.tipoEquipamentoId} value={tipo.nomeEquipamento}>
                {tipo.nomeEquipamento}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {(selectedTipoEquipamento === 'COMPUTADOR' || selectedTipoEquipamento === 'NOTEBOOK') && (
          <>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="cpu-label">Selecione a CPU</InputLabel>
              <Select
                labelId="cpu-label"
                id="cpu"
                value={selectedCPU}
                onChange={handleCPUMudanca}
                input={<OutlinedInput label="Selecione a CPU" />}
              >
                <MenuItem value="">Selecione...</MenuItem>
                {opcoesCPU.map((opcao) => (
                  <MenuItem key={opcao} value={opcao}>
                    {opcao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="memoriaRAM-label">Selecione a Memória RAM</InputLabel>
              <Select
                labelId="memoriaRAM-label"
                id="memoriaRAM"
                value={selectedMemoriaRAM}
                onChange={handleMemoriaRAMMudanca}
                input={<OutlinedInput label="Selecione a Memória RAM" />}
              >
                <MenuItem value="">Selecione...</MenuItem>
                {opcoesMemoriaRAM.map((opcao) => (
                  <MenuItem key={opcao} value={opcao}>
                    {opcao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="sistemaOperacional-label">Selecione o Sistema Operacional</InputLabel>
              <Select
                labelId="sistemaOperacional-label"
                id="sistemaOperacional"
                value={selectedSistemaOperacional}
                onChange={handleSistemaOperacionalMudanca}
                input={<OutlinedInput label="Selecione o Sistema Operacional" />}
              >
                <MenuItem value="">Selecione...</MenuItem>
                {opcoesSistemaOperacional.map((opcao) => (
                  <MenuItem key={opcao} value={opcao}>
                    {opcao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="temAcessoRemoto-label">Tem acesso remoto?</InputLabel>
              <Select
                labelId="temAcessoRemoto-label"
                id="temAcessoRemoto"
                value={temAcessoRemoto}
                onChange={(e) => setTemAcessoRemoto(e.target.value)}
                input={<OutlinedInput label="Tem acesso remoto?" />}
              >
                <MenuItem value={false}>Não</MenuItem>
                <MenuItem value={true}>Sim</MenuItem>
              </Select>
            </FormControl>
            {temAcessoRemoto && (
              <>
                <TextField
                  id="acessoRemoto"
                  name="acessoRemoto"
                  label="Acesso Remoto"
                  value={equipamentoData.acessoRemoto}
                  onChange={handleInputChange}
                  sx={{ width: '100%' }}
                />
                <TextField
                  id="senhaRemoto"
                  name="senhaRemoto"
                  label="Senha Remoto"
                  value={equipamentoData.senhaRemoto}
                  onChange={handleInputChange}
                  sx={{ width: '100%' }}
                />
              </>
            )}
          </>
        )}
        {['RACK', 'IMPRESSORA'].includes(selectedTipoEquipamento) && (
          <TextField
            id="descricao"
            name="descricao"
            label="Descrição"
            multiline
            rows={4}
            value={equipamentoData.descricao}
            onChange={handleInputChange}
            fullWidth
            disabled={selectedTipoEquipamento !== 'RACK' && selectedTipoEquipamento !== 'IMPRESSORA'}
          />
        )}
        <Button type="button" onClick={handleCadastrarEquipamentoClick} variant="contained" endIcon={<SendIcon />}>
          CADASTRAR
        </Button>
      </form>

      <Stack spacing={1} sx={{ 
        position: 'fixed', 
        top: theme.spacing(-12), 
        left: theme.spacing(3), 
        zIndex: theme.zIndex.drawer + 2 
      }}>
        <Slide direction="down" in={alertOpen} mountOnEnter unmountOnExit>
          <Alert variant="filled" severity={alertSeverity} sx={{ 
            height: '50px',
            position: 'fixed',
            bottom: 16,
            top: -100,
            left: '0%',
            width: '100%',
            transform: 'translateX(-50%)',
            zIndex: 999 
          }}>
            {alertMessage}
          </Alert>
        </Slide>
      </Stack>
    </Box>
  );
};

export default CadastrarEquipamentos;
