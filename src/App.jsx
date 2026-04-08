import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Busca from './pages/Busca';
import Home from './pages/Home';
import DetalhesDiarista from './pages/DetalhesDiarista';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro'; 
import  Perfil  from './components/Perfil';
import  MeusAgendamentos  from './pages/MeusAgendamentos';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
     <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow pt-28 pb-20">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path='/home' element={<Home />} />
            <Route path='/buscar' element={<Busca />} />
            <Route path='/diarista/:id' element={<DetalhesDiarista />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastro' element={<Cadastro />} /> 
            <Route path='/perfil' element={<Perfil />} />
            <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />   
          </Routes>
        </main>
        <Footer />
     </div> 
    </BrowserRouter> 
  );
}

export default App;