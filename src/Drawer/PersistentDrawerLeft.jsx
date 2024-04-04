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
import './CSS/stylesDrawer.css';
import './CSS/stylesTextField.css';

const drawerWidth = 240;

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
    marginLeft: `-${drawerWidth}px`,
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

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const iconMap = {
  'Clientes': <ApartmentIcon />,
  'Técnico': <ManageAccountsIcon />,
  'Laudos': <BorderColorIcon/>,
  'Chamados': <SupportAgentIcon/>,
  'Base de conhecimento': <PsychologyIcon/>
};

function getIcon(text) {
  return iconMap[text] || <ApartmentIcon />;
}

const categories = [
  { name: 'Clientes', subcategories: ['Cadastrar Empresa', 'Cadastrar Equipamentos', 'Consultar Empresas'] },
  { name: 'Técnico', subcategories: ['Cadastrar Técnico'] },
  { name: 'Laudos', subcategories: ['Laudo de preventiva','Laudo técnico', 'consultar laudos'] },
  { name: 'Chamados', subcategories: ['Criar chamados','Andamento de chamados','Historico'] },
  { name: 'Base de conhecimento', subcategories: ['Adicionar conhecimento','Consultar'] }
];

const TextContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}));

const LogoImage = styled('img')({
  height: 60,
  marginRight: 0,
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubToggle = (categoryName) => {
    setSubOpen((prevSubOpen) => ({
      ...prevSubOpen,
      [categoryName]: !prevSubOpen[categoryName]
    }));
  };

  const handleCadastroEmpresaOpen = () => {
    setCadastroEmpresaOpen(true);
    setCadastroEquipamentoOpen(false);
    setCadastroTecnicoOpen(false);
    setCriarLaudoTecnicoOpen(false);
    setCriarLaudoPreventivaOpen(false);
    setConsultarEmpresasOpen(false);
  };

  const handleCadastroEquipamentoOpen = () => {
    setCadastroEquipamentoOpen(true);
    setCadastroEmpresaOpen(false);
    setCadastroTecnicoOpen(false);
    setCriarLaudoTecnicoOpen(false);
    setCriarLaudoPreventivaOpen(false);
    setConsultarEmpresasOpen(false);
  };

  const handleCadastroTecnicoOpen = () => {
    setCadastroTecnicoOpen(true);
    setCadastroEmpresaOpen(false);
    setCadastroEquipamentoOpen(false);
    setCriarLaudoTecnicoOpen(false);
    setCriarLaudoPreventivaOpen(false);
    setConsultarEmpresasOpen(false);
  };

  const handleConsultarEmpresasOpen = () => {
    setConsultarEmpresasOpen(true);
    setCadastroEmpresaOpen(false);
    setCadastroEquipamentoOpen(false);
    setCadastroTecnicoOpen(false);
    setCriarLaudoTecnicoOpen(false);
    setCriarLaudoPreventivaOpen(false);
  };

  const handleCriarLaudoTecnicoOpen = () => {
    setCriarLaudoTecnicoOpen(true);
    setCadastroEmpresaOpen(false);
    setCadastroEquipamentoOpen(false);
    setCadastroTecnicoOpen(false);
    setCriarLaudoPreventivaOpen(false);
    setConsultarEmpresasOpen(false);
  };

  const handleCriarLaudoPreventivaOpen = () => {
    setCriarLaudoPreventivaOpen(true);
    setCadastroEmpresaOpen(false);
    setCadastroEquipamentoOpen(false);
    setCadastroTecnicoOpen(false);
    setCriarLaudoTecnicoOpen(false);
    setConsultarEmpresasOpen(false);
  };

  const handleFormClose = () => {
    setCadastroEmpresaOpen(false);
    setCadastroEquipamentoOpen(false);
    setCadastroTecnicoOpen(false);
    setCriarLaudoTecnicoOpen(false);
    setCriarLaudoPreventivaOpen(false);
    setConsultarEmpresasOpen(false);
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
                </ListItemButton>
              </ListItem>
              {subOpen[name] && (
                <List className="sub-categories">
                  {subcategories.map((subText) => (
                    <ListItem key={subText} disablePadding>
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
                        }
                      }}>
                        <ListItemText primary={subText} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </React.Fragment>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        {criarLaudoTecnicoOpen && <CriarLaudoTecnico onClose={handleFormClose} />}
        {criarLaudoPreventivaOpen && <CriarLaudoPreventiva onClose={handleFormClose} />} 
        {consultarEmpresasOpen && <EmpresaTable />} 
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
