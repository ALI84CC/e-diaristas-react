import { useState, useEffect } from "react" 
import DiaristasCard from "../components/DiaristasCard" 
import { db } from "../service/firebase" 
import { collection, getDocs, query, where } from "firebase/firestore"


export default function Busca() {

  const [diarista, setDiarista] = useState([])
  const [termoBusca, setTermoBusca] = useState("")
  const [filtroAtivo, setFiltroAtivo] = useState("todas")
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {

    console.log("Conectado ao projeto:", db.app.options.projectId);  

  const carregarDiarista = async () => {
    try {
        setCarregando(true);

        if(!db){
          console.error("ERRO: O objeto 'db' não foi importado corretamente.");
          return;
        }

        const diaristaRef = collection(db, "usuarios");

        // ✅ A MUDANÇA É AQUI: Criamos um filtro (query)
        // Filtramos para trazer apenas documentos que tenham o campo 'tipo' como 'diarista'
        const q = query(diaristaRef, where("tipo", "==", "diarista"));
        
        const querySnapShot = await getDocs(q); // Agora buscamos a query 'q', não a ref pura

        console.log("Status da busca filtrada:", querySnapShot.empty ? "Vazio" : "Dados encontrados");
        
        const listaDiaristas = querySnapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        setDiarista(listaDiaristas);

    } catch (error) {
        console.error("ERRO DETALHADO:", error);
    } finally {
        setCarregando(false);
    }
};
    carregarDiarista();
  }, []);


  const opcoesFiltro = [
    { id: 'todas', label: 'Todas' },
    { id: 'melhores', label: 'Melhores Avaliadas' },
    { id: 'metropolitana', label: 'Região Metropolitana' }
  ]

  // LÓGICA DE FILTRAGEM UNIFICADA (Onde a mágica acontece)
  const profissionaisFiltrados = diarista.filter((item) => {
    // 1. Primeiro, checamos o filtro de texto (Nome ou Cidade)
    const matchesTexto = 
      (item.nome?.toLowerCase() || "").includes(termoBusca.toLowerCase()) ||
      (item.cidade?.toLowerCase() || "").includes(termoBusca.toLowerCase());

    // 2. Depois, checamos o filtro dos botões
    let matchesBotao = true;
    if (filtroAtivo === 'melhores') {
      matchesBotao = (item.reputacao|| 0) >= 4;
    } else if (filtroAtivo === 'metropolitana') {
      matchesBotao = item.isMetropolitana === true;
    }

    // Retorna verdadeiro apenas se passar nos DOIS filtros ao mesmo tempo
    return matchesTexto && matchesBotao;
  });

  if(carregando){
    return <div className="text-center py-20">Carregando profissionais...</div>
  }

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
              <DiaristasCard key={item.id} diarista={item} />
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