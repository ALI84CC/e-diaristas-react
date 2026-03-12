import { onAuthStateChanged, signOut } from "firebase/auth";
import { Sparkle, XIcon, MenuIcon, LogOut } from "lucide-react" 
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { auth } from "../service/firebase";


export function Navbar(){

const [isOpen, setIsOpen] = useState(false)
const [user, setUser] = useState(null)
const navigate = useNavigate()

useEffect(() => {
    const unsubscrible = onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser)
    })
    return ()=>unsubscrible()
}, [])

const handleLogout = async () =>{
    try{
        await signOut(auth)
        alert("Você saiu da conta")
        navigate("/login")
    } catch(error) {
        console.error("Error ao sair:", error)
    }
}
    
const navClass = ({isActive})=>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
    isActive
        ?'text-white bg-blue-600 shadow-md'
        :'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;   

    return(
       <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
            <div className="flex items-center gap-2">
                <Sparkle className="text-blue-400" />
                <div className="text-white font-bold text-xl uppercase tracking-wider">e-diarista</div>
            </div>

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
                <NavLink to="/perfil" className={navClass}>
                    PERFIL
                </NavLink>
                {user ?(
                    <div className="flex fle-col md:flex-row items-center gap-4 mt-4 md:mt-0">
                        <span className="text-gray-300 text-sm italic ">
                            Olá,{user.email.split('@')[0]}
                        </span>
                        <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 text-red-400 houver:bg-red-900/20 rounded-md transition">
                            <LogOut size={18} />
                        </button>
                    </div>
                ): (
                <div className="flex flex-col md:flex-row  gap-2 mt-4 md:mt-0">
                        <NavLink 
                        to="/login" 
                        className="px-4 py-2 text-gray-300 hover:text-white text-sm  font-medium">
                            Entrar
                        </NavLink>
                        <NavLink 
                            to="/cadastro" 
                            className= "px-4 py-2 rounded-lg font-bold  bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
                            >
                                Criar Conta
                        </NavLink>
                </div>  
                )}
            </div>
        </div>
       </nav>
    )
}