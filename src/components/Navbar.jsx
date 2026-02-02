import { Sparkle } from "lucide-react"
import { NavLink } from "react-router-dom"

export function Navbar(){
    
const navClass = ({isActive})=>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
    isActive
        ?'text-white bg-blue-600 shadow-md'
        :'text-gray-300 hover:bg-gray-700 hover:white'
    }`;   

    return(
       <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
            <Sparkle className="text-blue-400" />
            <div className="text-white font-bold text-xl">E-DIARISTA</div>
        
            <div className="flex item space-x-2">
                <NavLink to="/" className={navClass}>
                    HOME
                </NavLink>
                <NavLink to="/buscar" className={navClass}>
                    BUSCA
                </NavLink>
            </div>
        </div>
       </nav>
    )
}