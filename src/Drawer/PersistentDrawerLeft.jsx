// PersistentDrawerLeft.jsx

import React, { useState, useEffect } from 'react';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PsychologyIcon from '@mui/icons-material/Psychology';
import stratusLogo from './imgDrawer/stratusLogo.png';
import './CSS/stylesDrawer.css';

const drawerWidth = 280;

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

const white = '#ffffff';

const iconMap = {
  'Clientes': <ApartmentIcon sx={{ color: white }} />,
  'Técnico': <ManageAccountsIcon sx={{ color: white }} />,
  'Laudos': <BorderColorIcon sx={{ color: white }} />,
  'Chamados': <SupportAgentIcon sx={{ color: white }} />,
  'Base de conhecimento': <PsychologyIcon sx={{ color: white }} />
};

function getIcon(text) {
  return iconMap[text] || <ApartmentIcon />;
}

const categories = [
  { name: 'Clientes', subcategories: ['Cadastrar Empresa', 'Cadastrar Equipamentos', 'Consultar Empresas'] },
  { name: 'Técnico', subcategories: ['Cadastrar Tecnico', 'Configurar Tecnicos'] },
  { name: 'Laudos', subcategories: ['Laudo de preventiva', 'Laudo tecnico', 'consultar laudos'] },
  { name: 'Chamados', subcategories: ['Criar chamados', 'Andamento de chamados', 'Historico'] },
  { name: 'Base de conhecimento', subcategories: ['Adicionar conhecimento', 'Consultar'] }
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

const SubCategoryList = styled(List)(({ theme }) => ({
  width: '100%', // Ajusta a largura para preencher totalmente o espaço disponível
}));

const SubCategoryListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(4), // Adiciona um recuo à esquerda para as subcategorias
  '&:hover': {
    backgroundColor: '#0c6690 !important' // Define a cor de fundo das subcategorias ao passar o mouse
  },
}));

export function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(true); // Inicializa o Drawer como aberto
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subOpen, setSubOpen] = useState({});
  const [subCategoryHover, setSubCategoryHover] = useState(null);

  useEffect(() => {
    const storedCategory = localStorage.getItem('selectedCategory');
    if (storedCategory) {
      setSelectedCategory(storedCategory);
      setSubOpen((prevSubOpen) => ({
        ...prevSubOpen,
        [storedCategory]: true
      }));
    }

    // Recupera as subcategorias abertas do armazenamento local
    const storedSubOpen = JSON.parse(localStorage.getItem('subOpen'));
    if (storedSubOpen) {
      setSubOpen(storedSubOpen);
    }
  }, []);

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
    setSelectedCategory(categoryName);
    localStorage.setItem('selectedCategory', categoryName);

    // Salva as subcategorias abertas no armazenamento local
    localStorage.setItem('subOpen', JSON.stringify({
      ...subOpen,
      [categoryName]: !subOpen[categoryName]
    }));
  };

  const handleSubItemClick = (categoryName) => {
    setSelectedCategory(categoryName);
    localStorage.setItem('selectedCategory', categoryName);
  };

  const handleSubCategoryMouseEnter = (subCategory) => {
    setSubCategoryHover(subCategory);
  };

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
            backgroundColor: '#0c6690', // Define a cor de fundo da gaveta
            borderRight: '2px solid #1290cb', // Define a cor da borda da gaveta
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
                  {subOpen[name] ? <ExpandMoreIcon style={{ color: '#FFFFFF' }} /> : <ChevronRightIcon style={{ color: '#FFFFFF' }} />}
                </ListItemButton>
              </ListItem>
              <SubCategoryList sx={{ display: subOpen[name] ? 'block' : 'none' }}>
                {subcategories.map((subText) => (
                  <SubCategoryListItem
                    key={subText}
                    disablePadding
                    onMouseEnter={() => handleSubCategoryMouseEnter(subText)}
                    onMouseLeave={handleSubCategoryMouseLeave}
                    onClick={() => handleSubItemClick(name)} // Atualiza a categoria expandida ao clicar em uma subcategoria
                  >
                    <ListItemButton
                      component="a"
                      href={`/${subText.replace(/\s+/g, '').toLowerCase()}`} // Navegar para a rota correspondente à subcategoria
                      sx={{
                        backgroundColor: '#094763', // Define a cor de fundo das subcategorias
                        '&:hover': {
                          backgroundColor: '#063145' // Define a cor de fundo das subcategorias ao passar o mouse
                        },
                      }}
                    >
                      <ListItemText
                        primary={subText}
                        sx={{ color: '#FFFFFF' }} // Define a cor do texto das subcategorias
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
    </Box>
  );
}
