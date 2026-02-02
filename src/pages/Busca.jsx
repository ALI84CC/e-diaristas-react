

export function Busca({dadosDiaristas}){
  const [termoBusca, setTermoBusca] = useState("")

  const profissionaisFiltrados = dadosDiaristas.diaristas.filter((diaristas)=>
    diarista.nome.toLowerCase.includes(termoBusca.toLowerCase()) ||
    diarista.cidae.toLowerCase.includes(termoBusca.toLowerCase())
)

    return(
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-800">Encontre sua diarista</h1>
                <p className="text-slate-600 mt-2"> Busque por uma nome ou cidade</p>

                <div className="mt-6 max-w-md mx-auto">
                    <input
                        type='text'
                        placeholder="Ex.Maria ou Anindeua"
                        className="w-full px-5 py-3 rounded-full border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                        value={termoBusca}
                        onChange = {(e) => setTermoBusca(e.target.value)}
                    />      
                </div>
            </div>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {profissionaisFiltrados.length > 0 ?(
                    profissionaisFiltrados.map((item)=>(
                        <DiaristasCard key={item.nome} diaristas={item}/>
                    ))
                ) : (

                    <div className="col-span-full text-center py-20 text-gray-400">
                        Nenhum profissional encontrado para o termo {termoBusca}
                    </div>
                )}
            </main>
        </div>
      </div>
    )
}