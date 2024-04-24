import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Adicionando o ícone de seta para baixo
import ApartmentIcon from '@mui/icons-material/Apartment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PsychologyIcon from '@mui/icons-material/Psychology';
import stratusLogo from './imgDrawer/stratusLogo.png';
import CriarLaudoTecnico from './CriarLaudoTecnico';
import CriarLaudoPreventiva from './CriarLaudoPreventiva';
import CadastroEmpresaForm from './CadastroEmpresaForm';
import CadastrarEquipamentoForm from './CadastrarEquipamentoForm';
import CadastroTecnicoForm from './CadastroTecnicoForm';
import EmpresaTable from './EmpresaTable';
import ConsultarLaudos from './ConsultarLaudosTecnicos'; // Importe o componente da tela de consulta de laudos
import './CSS/stylesDrawer.css';

const drawerWidth = 280;

// Estilizando o componente principal
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`, // Ajustando para que o drawer não cubra a página principal
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    position: 'relative',
    marginTop: '50px',
    textAlign: 'right',
  }),
);

// Estilizando o app bar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Estilizando o header do drawer
const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const white = '#ffffff'; // Cor branca

// Mapeamento dos ícones para cada categoria
const iconMap = {
  'Clientes': <ApartmentIcon sx={{ color: white }} />,
  'Técnico': <ManageAccountsIcon sx={{ color: white }} />,
  'Laudos': <BorderColorIcon sx={{ color: white }} />,
  'Chamados': <SupportAgentIcon sx={{ color: white }} />,
  'Base de conhecimento': <PsychologyIcon sx={{ color: white }} />
};

// Função para obter o ícone de acordo com o texto da categoria
function getIcon(text) {
  return iconMap[text] || <ApartmentIcon />;
}

// Definição das categorias e suas subcategorias
const categories = [
  { name: 'Clientes', subcategories: ['Cadastrar Empresa', 'Cadastrar Equipamentos', 'Consultar Empresas'] },
  { name: 'Técnico', subcategories: ['Cadastrar Técnico'] },
  { name: 'Laudos', subcategories: ['Laudo de preventiva','Laudo técnico', 'consultar laudos'] },
  { name: 'Chamados', subcategories: ['Criar chamados','Andamento de chamados','Historico'] },
  { name: 'Base de conhecimento', subcategories: ['Adicionar conhecimento','Consultar'] }
];

// Estilizando o container de texto
const TextContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}));

// Estilizando a imagem do logo
const LogoImage = styled('img')({
  height: 60,
  marginRight: 0,
});

const SubCategoryList = styled(List)(({ theme }) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: 0,
}));

const SubCategoryListItem = styled(ListItem)(({ theme }) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: 0,
}));

// Estilizando o ListItemText para alinhar à esquerda
const SubCategoryListItemText = styled(ListItemText)({
  whiteSpace: 'nowrap',
  paddingLeft: '60px', // Ajuste para alinhar mais à esquerda
});

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [subOpen, setSubOpen] = React.useState({});
  const [cadastroEmpresaOpen, setCadastroEmpresaOpen] = React.useState(false);
  const [cadastroEquipamentoOpen, setCadastroEquipamentoOpen] = React.useState(false);
  const [cadastroTecnicoOpen, setCadastroTecnicoOpen] = React.useState(false);
  const [criarLaudoTecnicoOpen, setCriarLaudoTecnicoOpen] = React.useState(false);
  const [criarLaudoPreventivaOpen, setCriarLaudoPreventivaOpen] = React.useState(false);
  const [consultarEmpresasOpen, setConsultarEmpresasOpen] = React.useState(false);
  const [consultarLaudosOpen, setConsultarLaudosOpen] = React.useState(false); // Adicionando estado para a tela de consulta de laudos
  const [subCategoryHover, setSubCategoryHover] = React.useState(null);

  // Função para abrir o drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Função para fechar o drawer
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Função para alternar a visibilidade das subcategorias
  const handleSubToggle = (categoryName) => {
    setSubOpen((prevSubOpen) => ({
      ...prevSubOpen,
      [categoryName]: !prevSubOpen[categoryName]
    }));
  };

  // Função para abrir o formulário de cadastro de empresa
  const handleCadastroEmpresaOpen = () => {
    setCadastroEmpresaOpen(true);
    setCadastroEquipamentoOpen(false);
    setCadastroTecnicoOpen(false);
    setCriarLaudoTecnicoOpen(false);
    setCriarLaudoPreventivaOpen(false);
    setConsultarEmpresasOpen(false);
    setConsultarLaudosOpen(false); // Fechar a tela de consulta de laudos ao abrir outro formulário
  };

  // Função para abrir o formulário de cadastro de equipamento
  const handleCadastroEquipamentoOpen = () => {
    setCadastroEquipamentoOpen(true);
    setCadastroEmpresaOpen(false);
    setCadastroTecnicoOpen(false);
    setCriarLaudoTecnicoOpen(false);
    setCriarLaudoPreventivaOpen(false);
    setConsultarEmpresasOpen(false);
    setConsultarLaudosOpen(false); // Fechar a tela de consulta de laudos ao abrir outro formulário
  };

  // Função para abrir o formulário de cadastro de técnico
  const handleCadastroTecnicoOpen = () => {
    setCadastroTecnicoOpen(true);
    setCadastroEmpresaOpen(false);
    setCadastroEquipamentoOpen(false);
    setCriarLaudoTecnicoOpen(false);
    setCriarLaudoPreventivaOpen(false);
    setConsultarEmpresasOpen(false);
    setConsultarLaudosOpen(false); // Fechar a tela de consulta de laudos ao abrir outro formulário
  };

  // Função para abrir a consulta de empresas
  const handleConsultarEmpresasOpen = () => {
    setConsultarEmpresasOpen(true);
    setCadastroEmpresaOpen(false);
    setCadastroEquipamentoOpen(false);
    setCadastroTecnicoOpen(false);
    setCriarLaudoTecnicoOpen(false);
    setCriarLaudoPreventivaOpen(false);
    setConsultarLaudosOpen(false); // Fechar a tela de consulta de laudos ao abrir outra tela de consulta
  };

  // Função para abrir a tela de consulta de laudos
  const handleConsultarLaudosOpen = () => {
    setConsultarLaudosOpen(true);
    setCadastroEmpresaOpen(false);
    setCadastroEquipamentoOpen(false);
    setCadastroTecnicoOpen(false);
    setCriarLaudoTecnicoOpen(false);
    setCriarLaudoPreventivaOpen(false);
    setConsultarEmpresasOpen(false); // Fechar a tela de consulta de empresas ao abrir a tela de consulta de laudos
  };

  // Função para abrir o formulário de criação de laudo técnico
  const handleCriarLaudoTecnicoOpen = () => {
    setCriarLaudoTecnicoOpen(true);
    setCadastroEmpresaOpen(false);
    setCadastroEquipamentoOpen(false);
    setCadastroTecnicoOpen(false);
    setCriarLaudoPreventivaOpen(false);
    setConsultarEmpresasOpen(false);
    setConsultarLaudosOpen(false); // Fechar a tela de consulta de laudos ao abrir outro formulário
  };

  // Função para abrir o formulário de criação de laudo de preventiva
  const handleCriarLaudoPreventivaOpen = () => {
    setCriarLaudoPreventivaOpen(true);
    setCadastroEmpresaOpen(false);
    setCadastroEquipamentoOpen(false);
    setCadastroTecnicoOpen(false);
    setCriarLaudoTecnicoOpen(false);
    setConsultarEmpresasOpen(false);
    setConsultarLaudosOpen(false); // Fechar a tela de consulta de laudos ao abrir outro formulário
  };

  // Função para fechar todos os formulários
  const handleFormClose = () => {
    setCadastroEmpresaOpen(false);
    setCadastroEquipamentoOpen(false);
    setCadastroTecnicoOpen(false);
    setCriarLaudoTecnicoOpen(false);
    setCriarLaudoPreventivaOpen(false);
    setConsultarEmpresasOpen(false);
    setConsultarLaudosOpen(false);
  };

  // Função para lidar com a entrada do mouse sobre as subcategorias
  const handleSubCategoryMouseEnter = (subCategory) => {
    setSubCategoryHover(subCategory);
  };

  // Função para lidar com a saída do mouse sobre as subcategorias
  const handleSubCategoryMouseLeave = () => {
    setSubCategoryHover(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#1290cb' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <LogoImage src={stratusLogo} alt="Stratus Telecom Logo" />
          <Typography variant="h6" noWrap component="div">
            Stratus Telecom
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className="custom-drawer"
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginLeft: 0, // Ajustando para que o drawer comece mais à esquerda
            transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
          },
        }}
      >
        <DrawerHeader className="drawerHeader">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {categories.map(({ name, subcategories }) => (
            <React.Fragment key={name}>
              <ListItem disablePadding onClick={() => handleSubToggle(name)}>
                <ListItemButton>
                  <ListItemIcon>
                    {getIcon(name)}
                  </ListItemIcon>
                  <ListItemText primary={name} />
                  {subOpen[name] ? <ExpandMoreIcon style={{ color: '#FFFFFF' }} /> : <ChevronRightIcon style={{ color: '#FFFFFF' }} />} {/* Definindo a cor da seta como branco */}
                </ListItemButton>
              </ListItem>
              <SubCategoryList className="sub-categories" sx={{ ...(subOpen[name] && { width: drawerWidth }) }}>
                {subOpen[name] && subcategories.map((subText) => (
                  <SubCategoryListItem
                    key={subText}
                    disablePadding
                    onMouseEnter={() => handleSubCategoryMouseEnter(subText)}
                    onMouseLeave={handleSubCategoryMouseLeave}
                  >
                    <ListItemButton onClick={() => {
                      if (subText === 'Cadastrar Empresa') {
                        handleCadastroEmpresaOpen();
                      } else if (subText === 'Cadastrar Equipamentos') {
                        handleCadastroEquipamentoOpen();
                      } else if (subText === 'Consultar Empresas') {
                        handleConsultarEmpresasOpen();
                      } else if (subText === 'Cadastrar Técnico') {
                        handleCadastroTecnicoOpen();
                      } else if (subText === 'Laudo técnico') {
                        handleCriarLaudoTecnicoOpen();
                      } else if (subText === 'Laudo de preventiva') {
                        handleCriarLaudoPreventivaOpen();
                      } else if (subText === 'consultar laudos') {
                        handleConsultarLaudosOpen();
                      }
                    }}>
                      <SubCategoryListItemText
                        primary={subText}
                        sx={{ ...(subCategoryHover === subText && { opacity: 0.7 }) }}
                      />
                    </ListItemButton>
                  </SubCategoryListItem>
                ))}
              </SubCategoryList>
            </React.Fragment>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        className="main-container"
        sx={{
          flexGrow: 0,
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        <Toolbar />
        {criarLaudoTecnicoOpen && <CriarLaudoTecnico onClose={handleFormClose} />}
        {criarLaudoPreventivaOpen && <CriarLaudoPreventiva onClose={handleFormClose} />}
        {consultarEmpresasOpen && <EmpresaTable />}
        {consultarLaudosOpen && <ConsultarLaudos />} {/* Renderizando a tela de consulta de laudos */}
        {(cadastroEmpresaOpen || cadastroEquipamentoOpen || cadastroTecnicoOpen) && (
          <TextContainer>
            {cadastroEmpresaOpen && <CadastroEmpresaForm onClose={handleFormClose} />}
            {cadastroEquipamentoOpen && <CadastrarEquipamentoForm onClose={handleFormClose} />}
            {cadastroTecnicoOpen && <CadastroTecnicoForm onClose={handleFormClose} />}
          </TextContainer>
        )}
      </Box>
    </Box>
  );
}
