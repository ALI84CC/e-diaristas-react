import { Star } from "lucide-react"
import { useState } from "react"

export function RatingModal({isOpen, onclose, onConfirm, diaristaNome}){

    const[rating,setRating] = useState(0)
    const[hover, setHover] = useState(0)

    if(!isOpen) return null
    
    return(
    <div className=" fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center max-auto mb-4">
                    <Star size={32} className="text-yellow-600" fill="currentColor" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2 ">Avalie o Serviço</h2>
                <p className="text-gray-500 mb-6">
                    Como foi a experiência com a diarista <span className="font-semibold text-blue-600">{diaristaNome}</span>?
                </p>
            </div>
        <div className="flex justify-center gap-2 mb-8">
            {[1,2,3,4,5].map((star)=>(
                <button
                 key={star}
                 type="button"
                 onClick={()=>setRating(star)}
                 onMouseEnter={()=>setHover(star)}
                 onMouseLeave={()=>setHover(0)}
                 className="transition-transform houver:scale-125 active:scale-90"
                 >
                    <Star
                    size={42}
                    fill={(hover || rating) >= star ? "#eab308" : "none"}
                    className={(hover || rating) >= star ? "text-yellow-500" : "text-gray-300"}
                />
                 </button>
            ))}
        </div> 
            <div className="flex flex-col gap-3">
                <button
                onClick={() => onConfirm(rating)}
                disabled={rating === 0}
                className={`w-full py-4 rounded-2xl font-bold transition-all ${
                    rating > 0 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                >
                Enviar Avaliação
                </button>
                
                <button 
                onClick={onclose}
                className="text-gray-400 text-sm font-medium py-2 hover:text-gray-600 transition"
                >
                Agora não
                </button>
            </div>     
        </div>
    </div>
    )
}

export default RatingModal