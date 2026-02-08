import { useState } from "react"
import DiaristasCards from "../components/DiaristasCard" 


export default function Busca({ dadosDiaristas }) {
  const [termoBusca, setTermoBusca] = useState("")
  const [filtroAtivo, setFiltroAtivo] = useState("todas")

  const opcoesFiltro = [
    { id: 'todas', label: 'Todas' },
    { id: 'melhores', label: 'Melhores Avaliadas' },
    { id: 'metropolitana', label: 'Região Metropolitana' }
  ]

  // LÓGICA DE FILTRAGEM UNIFICADA (Onde a mágica acontece)
  const profissionaisFiltrados = dadosDiaristas.diaristas.filter((item) => {
    // 1. Primeiro, checamos o filtro de texto (Nome ou Cidade)
    const matchesTexto = 
      item.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      item.cidade.toLowerCase().includes(termoBusca.toLowerCase());

    // 2. Depois, checamos o filtro dos botões
    let matchesBotao = true;
    if (filtroAtivo === 'melhores') {
      matchesBotao = item.avaliacao >= 4;
    } else if (filtroAtivo === 'metropolitana') {
      matchesBotao = item.isMetropolitana === true;
    }

    // Retorna verdadeiro apenas se passar nos DOIS filtros ao mesmo tempo
    return matchesTexto && matchesBotao;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-800">Encontre sua diarista</h1>
          <p className="text-slate-600 mt-2">Busque por nome ou cidade</p>

          <div className="mt-6 max-w-md mx-auto">
            <input
              type='text'
              placeholder="Ex. Maria ou Ananindeua"
              className="w-full px-5 py-3 rounded-full border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
        </div>

        {/* BOTÕES DE FILTRO */}
        <nav aria-label="Filtro de busca" className="flex gap-3 justify-center p-4 mb-8 overflow-x-auto">
          {opcoesFiltro.map((opcao) => (
            <button
              key={opcao.id}
              onClick={() => setFiltroAtivo(opcao.id)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200
                ${filtroAtivo === opcao.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}
              `}
            >
              {opcao.label}
            </button>
          ))}
        </nav>

        {/* CONTADOR DE RESULTADOS */}
        <p className="text-gray-500 mb-4 font-medium">
          Encontramos {profissionaisFiltrados.length} profissionais
        </p>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profissionaisFiltrados.length > 0 ? (
            profissionaisFiltrados.map((item) => (
              <DiaristasCards key={item.id} diaristas={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400">
              Nenhum profissional encontrado para "{termoBusca}" nesta categoria.
            </div>
          )}
        </main>
      </div>
    </div>
  )
}