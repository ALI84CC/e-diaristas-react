import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import  Busca  from './pages/Busca';
import  Home  from './pages/Home';
import DetalhesDiarista from './pages/DetalhesDiarista';


function App() {
  
  return (
  
    <BrowserRouter>
    <Navbar/>
 <Routes>
  <Route path="/" element={<Home />} /> 
  <Route path='/Home' element={<Home />} />
  <Route path='/buscar' element={<Busca />} />
  <Route path='/diarista/:id' element={<DetalhesDiarista />} />
</Routes>
    </BrowserRouter>
  
  );
}

export default App;

