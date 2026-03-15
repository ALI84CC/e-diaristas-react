import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Busca from './pages/Busca';
import Home from './pages/Home';
import DetalhesDiarista from './pages/DetalhesDiarista';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro'; 
import { Perfil } from './components/Perfil';
import { MeusAgendamentos } from './pages/MeusAgendamento';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path='/home' element={<Home />} />
        <Route path='/buscar' element={<Busca />} />
        <Route path='/diarista/:id' element={<DetalhesDiarista />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} /> 
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/meusAgendamentos' element={<MeusAgendamentos />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;