import './index.css'
import DiaristasCards  from './components/DiaristasCard'
import dados from './data/diaristas.json';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import  Busca  from './pages/Busca';
import  Home  from './pages/Home';

function App() {
  
  return (
  
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Busca dadosDiaristas={dados}/>} />
      <Route path='/Home' element={<Home />} />
    </Routes>
    </BrowserRouter>
   


    /*<div className='min-h-screem bg-gray-50 p-6'>
     
      <div className='max-w-2xl mx-auto'>
        <header className='mb-8 text-center'>
        <h1 className='text-3xl font-bold text-gray-900'>E-Diaristas</h1>
        <p className='text-gray-600'>Encontre a profissional ideal para sua casa</p>
       </header>
       <main>
         {dados.diaristas.map((item)=>(
          <DiaristasCards key={item.id} diaristas={item} />
         ))}
        </main> 
     </div> 
    </div>*/
  );
}

export default App;

