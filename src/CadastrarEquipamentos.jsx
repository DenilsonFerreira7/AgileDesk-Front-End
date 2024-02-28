import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


export default function CadastrarEquipamentos() {
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [selectedTipoEquipamento, setSelectedTipoEquipamento] = useState('');
  const [selectedCPU, setSelectedCPU] = useState('');
  const [selectedFonte, setSelectedFonte] = useState('');
  const [selectedMemoriaRAM, setSelectedMemoriaRAM] = useState('');
  const [selectedSistemaOperacional, setSelectedSistemaOperacional] = useState('');
  const [equipamentoData, setEquipamentoData] = useState({
    nomeEquipamento: '',
    descricao: '',
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  // Opções para cada categoria
  const opcoesCPU = ['CELERON', 'I3', 'I5', 'I7'];
  const opcoesFonte = ['250', '350', '400', '500', '600'];
  const opcoesMemoriaRAM = ['2', '4', '6', '12', '16', '32'];
  const opcoesSistemaOperacional = ['WIN7', 'WIN8', 'WIN10', 'WIN11'];

  useEffect(() => {
    // Ao carregar o componente, buscar a lista de empresas cadastradas
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
  }, [selectedTipoEquipamento, selectedCPU, selectedFonte, selectedMemoriaRAM, selectedSistemaOperacional]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEquipamentoData({
      ...equipamentoData,
      [name]: value.toUpperCase(), // Converter para caixa alta
    });
  };

  const handleTipoEquipamentoChange = (e) => {
    const selectedTipo = e.target.value;
    setSelectedTipoEquipamento(selectedTipo);

    // Limpar seleções anteriores ao mudar o tipo de equipamento
    setSelectedCPU('');
    setSelectedFonte('');
    setSelectedMemoriaRAM('');
    setSelectedSistemaOperacional('');
  };

  const handleCPUMudanca = (e) => {
    const cpuSelecionada = e.target.value;
    setSelectedCPU(cpuSelecionada.toUpperCase()); // Converter para caixa alta
  };

  const handleFonteMudanca = (e) => {
    const fonteSelecionada = e.target.value;
    setSelectedFonte(fonteSelecionada.toUpperCase()); // Converter para caixa alta
  };

  const handleMemoriaRAMMudanca = (e) => {
    const memoriaRAMSelecionada = e.target.value;
    setSelectedMemoriaRAM(memoriaRAMSelecionada.toUpperCase()); // Converter para caixa alta
  };

  const handleSistemaOperacionalMudanca = (e) => {
    const sistemaOperacionalSelecionado = e.target.value;
    setSelectedSistemaOperacional(sistemaOperacionalSelecionado.toUpperCase()); // Converter para caixa alta
  };

  const atualizarDescricao = () => {
    // Atualizar a descrição com base nas opções selecionadas
    let descricao = '';
    if (selectedTipoEquipamento === 'COMPUTADOR' || selectedTipoEquipamento === 'NOTEBOOK') {
      descricao = `Tipo: ${selectedTipoEquipamento} | CPU: ${selectedCPU} | Fonte: ${selectedFonte} | Memória RAM: ${selectedMemoriaRAM} | SO: ${selectedSistemaOperacional}`;
    }
    setEquipamentoData({
      ...equipamentoData,
      descricao: descricao,
    });
  };

  const limparCampos = () => {
    setSelectedEmpresa('');
    setSelectedTipoEquipamento('');
    setSelectedCPU('');
    setSelectedFonte('');
    setSelectedMemoriaRAM('');
    setSelectedSistemaOperacional('');
    setEquipamentoData({
      nomeEquipamento: '',
      descricao: '',
    });
  };

  const handleCadastrarEquipamentoClick = async () => {
    try {
      // Verificar se a empresa e o tipo de equipamento foram selecionados
      if (!selectedEmpresa || !selectedTipoEquipamento) {
        exibirAlerta('Selecione uma empresa e um tipo de equipamento.', 'error');
        return;
      }

      // Enviar requisição para cadastrar o equipamento
      const response = await axios.post(`http://localhost:8080/empresas/${selectedEmpresa}/equipamentos/cadastrar`, equipamentoData);
      
      // Limpar os campos após o cadastro
      limparCampos();

      // Definir mensagem de sucesso
      exibirAlerta('Equipamento cadastrado com sucesso!', 'success');
    } catch (error) {
      // Lidar com erros
      exibirAlerta('Erro ao cadastrar equipamento.', 'error');
      console.error('Erro ao cadastrar equipamento:', error);
    }
  };

  const exibirAlerta = (mensagem, severidade) => {
    setAlertMessage(mensagem);
    setAlertSeverity(severidade);
    setAlertOpen(true);
    // Fechar o alerta após 5 segundos
    setTimeout(() => {
      setAlertOpen(false);
    }, 5000);
  };

  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" gutterBottom style={{ fontSize: 'clamp(16px, 5vw, 24px)', textAlign: 'left', marginBottom: theme.spacing(6) }}>
        Cadastre um novo equipamento
      </Typography>

      <Stack spacing={1} sx={{ position: 'fixed', top: theme.spacing(-12), left: theme.spacing(3), zIndex: theme.zIndex.drawer + 2 }}>
      <Slide direction="down" in={alertOpen} mountOnEnter unmountOnExit>
  <Alert variant="filled" severity={alertSeverity} sx={{ height: '50px',

position: 'fixed',
bottom: 16,
top:-100,
left: '0%',
width: '100%',
transform: 'translateX(-50%)',
zIndex: 999 
}}>
    {alertMessage}
  </Alert>
</Slide>
      </Stack>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 2 },
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField id="nomeEquipamento" name="nomeEquipamento" label="Nome do Equipamento" value={equipamentoData.nomeEquipamento} onChange={handleInputChange} sx={{ width: '40ch' }} />
          <FormControl sx={{ m: 1, width: '40ch' }}>
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
          <FormControl sx={{ m: 1, width: '40ch' }}>
            <InputLabel id="tipo-equipamento-label">Selecione o Tipo de Equipamento</InputLabel>
            <Select
              labelId="tipo-equipamento-label"
              id="tipo-equipamento"
              value={selectedTipoEquipamento}
              onChange={handleTipoEquipamentoChange}
              input={<OutlinedInput label="Selecione o Tipo de Equipamento" />}
            >
              <MenuItem value="">Selecione...</MenuItem>
              <MenuItem value="COMPUTADOR">COMPUTADOR</MenuItem>
              <MenuItem value="NOTEBOOK">NOTEBOOK</MenuItem>
              <MenuItem value="RACK">RACK</MenuItem>
              <MenuItem value="IMPRESSORA">IMPRESSORA</MenuItem>
            </Select>
          </FormControl>
          {(selectedTipoEquipamento === 'COMPUTADOR' || selectedTipoEquipamento === 'NOTEBOOK') && (
            <>
              <FormControl sx={{ m: 1, width: '40ch' }}>
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
              <FormControl sx={{ m: 1, width: '40ch' }}>
                <InputLabel id="fonte-label">Selecione a Fonte</InputLabel>
                <Select
                  labelId="fonte-label"
                  id="fonte"
                  value={selectedFonte}
                  onChange={handleFonteMudanca}
                  input={<OutlinedInput label="Selecione a Fonte" />}
                >
                  <MenuItem value="">Selecione...</MenuItem>
                  {opcoesFonte.map((opcao) => (
                    <MenuItem key={opcao} value={opcao}>
                      {opcao}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: '40ch' }}>
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
              <FormControl sx={{ m: 1, width: '40ch' }}>
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
            </>
          )}
          {['RACK', 'IMPRESSORA'].includes(selectedTipoEquipamento) && (
            <TextField
              id="descricao"
              name="descricao"
              label="Descrição"
              multiline
              rows={4}
              value=""
              onChange={handleInputChange}
              fullWidth
              disabled
              sx={{ m: 1, width: '40ch' }} // Estilo para a descrição
            />
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: theme.spacing(6) }}>
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleCadastrarEquipamentoClick} sx={{ m: 1 }}>
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
