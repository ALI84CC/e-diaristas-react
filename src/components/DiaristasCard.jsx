import { Star } from "lucide-react";

export default function DiaristasCard({diaristas}){
    return(
        <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm p-4 gap-4 hover:shadow-md transition-shadow mb-4">
            {/*foto do perfil*/}
            <img 
            src={diaristas.foto}
            alt={diaristas.nome}
            className=" w-24 h-24 rounded-full object-cover border-2 border-green-500"
            />

            {/* dados da diarista */}
            <div className="flex items-center justify-between mt-3">
                <div className=" flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <Star
                        key={i}
                        size={16}
                        fill={i <diaristas.reputacao?"currentColor" : "nome"}/>
                    ))}
                    <span className="text-xs text-gray-400 ml-1">({diaristas.reputacao})</span>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 transition-colors text-sm">
                    Agendar R$ {diaristas.valor_hora.toFixed(2)}
                </button>
            </div>
        </div>
    )
}