import { useParams } from "react-router-dom"
import dados from '../data/diaristas.json';
import { Calendar, Info, DollarSign } from "lucide-react";



export default function DetalhesDiarista(){

    const {id} = useParams()
    const diaristaEncontrada = dados.diaristas.find(d => d.id === Number(id));

    console.log("ID da URL:", id);
    console.log("Diarista encontrada:", diaristaEncontrada);

    if(!diaristaEncontrada){
        return <h2 className="text-center mt-10">Diarista nãoi encontrada</h2>
    }
    return(
        <main className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-4xl max-auto space-y-6">
                {/*primeiro card */}
             <section className="bg-white rounded-3xl border border-gray-300 shadow-md overflow-hidden" >
                <div className="p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                               <img 
                        src={diaristaEncontrada.foto} 
                        className="w-48 h-48 rounded-2xl object-cover shadow-md border border-gray-100" 
                        alt={diaristaEncontrada.nome} />
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 ">{diaristaEncontrada.nome}</h1>
                            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                                Profissional Verificada
                            </span>    
                            <p className="text-gray-500 mt-3 flex items-center justify-center md:justify-start gap-1">
                                ⭐ <span className="text-yellow-500 font-bold">{diaristaEncontrada.avaliacao} (45 avaliações)</span>
                            </p>    
                        </div>
                    </div>  

                     <div className="mt-10 border-t border-gray-100 pt-8"> 
                        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                           <Info size={20} className="text-blue-600"  />Sobre Mim:  
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg italic">
                            {diaristaEncontrada.descricao}
                        </p>
                      
                    </div>           
                </div>
            </section>
                 {/*segunda sessão: Formulario de contratação*/}
            <section className="bg-white rounded-3xl border border-gray-200 sticky p-8">
                <div className="max-w-md max-auto text-center">
                    <h3 className="text-xl font-semibold mb-4 text-gray-500 uppercase tracking-wider text-center">
                        Contrate agora
                    </h3>
                     <div className="mt-4 flex gap-2 text-center ">
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-bold ">
                                Valor/Hora: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(diaristaEncontrada.valor_hora)}
                            </span>
                        </div>
                    
                    <form className="space-y-6 mt-8">
                    <div className="text-left">
                        <label className="flex items-center  text-sm font-medium text-gray-700 mb-1">
                            <Calendar size={18} className="text-blue-500 px-1 " />
                            Data do Serviço
                        </label>
                        <input 
                        type="date" 
                        min={new Date().toISOString().split("T")[0]} 
                        className="w-full mt-1 p-4 rounded-2xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                    </div>
                    <button type="button" className="w-full bg-blue-600 text-white font-extrabold py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95">
                        Confirmar Agendamento
                    </button>
                    </form>
                </div> 
            </section>
        </div>
    </main>
    )            
}