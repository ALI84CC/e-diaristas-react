import { Link } from "react-router-dom"; 
import { Star } from "lucide-react";

export default function DiaristasCard({diarista}){

    console.log("Dados recebidos no card:", diarista)

     if(!diarista) return null

    return(
        <div className="border p-4 rounded-xl shadow-sm bg-white">
           <img 
            src={diarista.foto || 'https://via.placeholder.com/400'}
            alt={diarista.nome}
            className="w-full h-48 object-cover"
            />
         <h3 className="font-bold mt-2 text-lg text-gray-800">{diarista.nome || 'nome não informado'}</h3>
         <p className="text-gray-500 text-sm">{diarista.cidade}</p>
         
        <div className="flex items-center gap-1 mt-2 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-bold text-gray-700">{diarista.reputacao || diarista.avaliacao || 0}</span>
        </div>

         < Link 
         to={`/diarista/${diarista.id}`} 
         className="block mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition-colors"   
         >  
            Ver detalhes 
          </Link>
        </div>
    )
}
