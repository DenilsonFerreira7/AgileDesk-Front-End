import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddHomeIcon from '@mui/icons-material/AddHome';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CadastrarEmpresa from './CadastrarEmpresa'; // Importação do componente CadastrarEmpresaTextField
import CadastrarEquipamentos from './CadastrarEquipamentos';
import CustomizedTables from './CustomizedTables'; // Importação do componente CustomizedTables
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Adicionando o ícone SupportAgentIcon
import PsychologyIcon from '@mui/icons-material/Psychology'; // Adicionando o ícone PsychologyIcon
import './CustomDrawer.css'; // Importação do arquivo CSS
import './styles.css';
import AccountMenu from './AccountMenu'; // Importação do componente AccountMenu

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showCadastrarEmpresa, setShowCadastrarEmpresa] = useState(false);
  const [showCadastrarEquipamentos, setShowCadastrarEquipamentos] = useState(false);
  const [showConsultarEmpresa, setShowConsultarEmpresa] = useState(false); // Adicionando estado para controlar a exibição da tabela

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleCategoryClick = (category) => {
    setExpandedCategories((prevExpanded) => ({
      ...prevExpanded,
      [category]: !prevExpanded[category],
    }));
    // Esconder o campo de Cadastrar Empresa se outra categoria for clicada
    setShowCadastrarEmpresa(false);
    setShowCadastrarEquipamentos(false);
    setShowConsultarEmpresa(false); // Fechar a tabela ao clicar em outra categoria
  };

  const handleSubItemClick = (subItem) => {
    if (subItem === 'Cadastrar Empresa') {
      setShowCadastrarEmpresa(true);
      setShowCadastrarEquipamentos(false);
      setShowConsultarEmpresa(false); // Fechar a tabela ao clicar em "Cadastrar Empresa"
    } else if (subItem === 'Cadastrar Equipamentos') {
      setShowCadastrarEmpresa(false);
      setShowCadastrarEquipamentos(true);
      setShowConsultarEmpresa(false); // Fechar a tabela ao clicar em "Cadastrar Equipamentos"
    } else if (subItem === 'Consultar Empresa') {
      setShowCadastrarEmpresa(false);
      setShowCadastrarEquipamentos(false);
      setShowConsultarEmpresa(true); // Abrir a tabela ao clicar em "Consultar Empresa"
    } else {
      setShowCadastrarEmpresa(false);
      setShowCadastrarEquipamentos(false);
      setShowConsultarEmpresa(false);
    }
  };

  const drawer = (
    <div>
      <Toolbar style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', background: '#1393cc', padding: '10px', borderRadius: '0px' }}></div>
        <Typography variant="h6" noWrap component="div" style={{ position: 'absolute', left: '73px', top: '50%', transform: 'translateY(-50%)', color: 'white' }}>
          Stratus Telecom
        </Typography>
        <img src="/src/img/images.png" alt="Logo da Empresa" style={{ width: '23%', top: '0%', maxHeight: '90px', position: 'absolute', left: '15px' }} />
      </Toolbar>
      <Divider />
      <List>
        {[
          { primary: 'Empresa', subItems: ['Cadastrar Empresa', 'Cadastrar Equipamentos', 'Consultar Empresa'] },
          { primary: 'Técnico', subItems: ['Cadastrar Técnico', 'Configurar Conta'] },
          { primary: 'Laudo Técnico', subItems: ['Criar Laudo Tecnico','Criar laudo de preventiva', 'Consultar Laudo'] },
          { primary: 'Chamados', subItems: ['Abrir chamado', 'Consultar chamados'] },
          { primary: 'Base de Conhecimento', subItems: ['Publicar artigo','Visualizar Artigos'] },
        ].map((menuItem, index) => (
          <div key={index}>
            <ListItem disablePadding onClick={() => handleCategoryClick(menuItem.primary)}>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? <AddHomeIcon /> : (index === 1 ? <ManageAccountsIcon /> : (index === 3 ? <SupportAgentIcon /> : (index === 4 ? <PsychologyIcon /> : <ModeEditOutlineIcon />)))}
                </ListItemIcon>
                <ListItemText primary={menuItem.primary} />
              </ListItemButton>
            </ListItem>
            <Collapse in={expandedCategories[menuItem.primary]} timeout="auto" unmountOnExit>
              {menuItem.subItems.map((subItem, subIndex) => (
                <ListItem key={subIndex} disablePadding onClick={() => handleSubItemClick(subItem)}>
                  <ListItemButton>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary={subItem} className="listItemText" />
                  </ListItemButton>
                </ListItem>
              ))}
            </Collapse>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: '#1393cc'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{ color: '#ffffff' }}>
            
          </Typography>
          {/* Adicione o componente AccountMenu à direita da barra de ferramentas */}
          <Box sx={{ flexGrow: 1 }} />
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          overflowX: 'auto', // Adicionando overflow-x: auto para permitir rolagem horizontal
          '&::-webkit-scrollbar': { // Estilizando a barra de rolagem apenas para navegadores WebKit (Chrome, Safari, etc.)
            height: '12px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
          },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography paragraph>
        </Typography>
        <Typography paragraph>
        </Typography>
      </Box>
      {/* Renderizar CadastrarEmpresaTextField ou CadastrarEquipamentos apenas se showCadastrarEmpresa ou showCadastrarEquipamentos for verdadeiro */}
      <Box className="container-cadastrar-empresa">
        {showCadastrarEmpresa && <CadastrarEmpresa />}
        {showCadastrarEquipamentos && <CadastrarEquipamentos />}
        {showConsultarEmpresa && <CustomizedTables />} {/* Renderizar a tabela quando showConsultarEmpresa for verdadeiro */}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
