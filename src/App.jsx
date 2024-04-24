import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importe o componente Routes

import PersistentDrawerLeft from './Drawer/PersistentDrawerLeft';
import Login from './Drawer/login';

function App() {
  return (
    <Router>
      <Routes> {/* Use o componente Routes aqui */}
        <Route exact path="/" element={<PersistentDrawerLeft />} /> {/* Use o atributo element */}
        <Route path="/login" element={<Login />} /> {/* Use o atributo element */}
      </Routes>
    </Router>
  );
}

export default App;
