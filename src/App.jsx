import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistentDrawerLeft } from './Drawer/PersistentDrawerLeft'; // Importe com chaves
import Login from './Drawer/login';
import ConfigurarTecnicos from './Drawer/ConfigurarTecnicos';
import CadastroEmpresaForm from './Drawer/CadastroEmpresaForm';
import CadastrarEquipamentoForm from './Drawer/CadastrarEquipamentoForm';
import EmpresaTable from './Drawer/EmpresaTable';
import CadastroTecnicoForm from './Drawer/CadastroTecnicoForm';
import CriarLaudoPreventiva from './Drawer/CriarLaudoPreventiva';
import CriarLaudoTecnico from './Drawer/CriarLaudoTecnico';
import ConsultarLaudosTecnicos from './Drawer/ConsultarLaudosTecnicos';

const drawerWidth = 280;

const styles = {
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: '16px',
    transition: 'margin 0.3s ease',
    marginLeft: `-${drawerWidth}px`,
  },
};

const Home = () => {
  return <h1>Home Page</h1>;
}

function App() {
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    // Recupera a categoria expandida do armazenamento local ao montar o componente
    const storedCategory = localStorage.getItem('expandedCategory');
    if (storedCategory) {
      setExpandedCategory(storedCategory);
    }
  }, []);

  const handleSubToggle = (categoryName) => {
    // Atualiza a categoria expandida e salva no armazenamento local
    setExpandedCategory(categoryName);
    localStorage.setItem('expandedCategory', categoryName);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <div style={styles.root}>
              <PersistentDrawerLeft expandedCategory={expandedCategory} onSubToggle={handleSubToggle} />
              <div style={styles.content}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/configurartecnicos" element={<ConfigurarTecnicos />} />
                  <Route path="/cadastrarempresa" element={<CadastroEmpresaForm />} />
                  <Route path="/cadastrarequipamentos" element={<CadastrarEquipamentoForm />} />
                  <Route path="/consultarempresas" element={<EmpresaTable />} />
                  <Route path="/cadastrartecnico" element={<CadastroTecnicoForm />} />
                  <Route path="/laudodepreventiva" element={<CriarLaudoPreventiva />} />
                  <Route path="/laudotecnico" element={<CriarLaudoTecnico />} />
                  <Route path="/consultarlaudos" element={<ConsultarLaudosTecnicos />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
