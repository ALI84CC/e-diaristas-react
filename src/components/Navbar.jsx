import { Sparkle, XIcon, MenuIcon } from "lucide-react" 
import { useState } from "react";
import { NavLink } from "react-router-dom"


export function Navbar(){

const [isOpen, setIsOpen] = useState(false)
    
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
        
              <button 
                onClick={()=>setIsOpen(!isOpen)}
                className=" md:hidden text-gray-300 hover:text-white">
                        {isOpen? <XIcon size={28} />:<MenuIcon size={28} />}
                </button>

            <div className={`
                    ${isOpen ? 'flex' : 'hidden'}
                    flex-col md:flex-row absolute md:static bg-gray-900 md:bg-transparent
                    w-full md:w-auto left-0 top-16 md:top-0 p-4 md:p-0
                    md:flex md:items-center md:space-x-4 border-t border-gray-800 md:border-none
                `}>
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