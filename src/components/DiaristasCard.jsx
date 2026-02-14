import { Star } from "lucide-react";
import DetalhesDiarista from "../pages/DetalhesDiarista";
import { useNavigate } from "react-router-dom";

export default function DiaristasCard({diaristas}){

    const navigate = useNavigate(); 

    const handleVerDetalhes = () => {
        navigate(`/diarista/${diaristas.id}`)
    }

    return(
        <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm p-4 gap-y-2 hover:shadow-xl transition mb-4">
            {/*foto do perfil*/}
            <img 
            src={diaristas.foto}
            alt={diaristas.nome}
            className=" w-24 h-24 rounded-full mx-auto object-cover border-2 border-green-500"
            />

            {/* dados da diarista */}
            <div className="flex flex-col overflow-hidden w-full p-6 justify-between mt-3 items-center gap-4">
                <h3 className="text-center text-xl font-semibold mt-4 text-gray-800">{diaristas.nome}</h3>
                <p className="text-gray-500 text-sm text-center mb-4">{diaristas.cidade}</p>
                <div className=" flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <Star
                        key={i}
                        size={16}
                        fill={i <diaristas.reputacao?"currentColor" : "none"}/>
                    ))}
                    <span className="text-xs text-gray-400 ml-1 space-y-6">({diaristas.reputacao})</span>                   
            </div>
            <button 
            onClick={handleVerDetalhes}
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">      
                Ver Perfil e Contratar
            </button>  
         </div>   
             
        </div>
    )
}
