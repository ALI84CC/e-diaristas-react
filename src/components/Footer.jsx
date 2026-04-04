import { X } from "lucide-react";
import { FiFacebook, FiInstagram } from "react-icons/fi";

export default function Footer(){
    return(
        <footer className="bg-white border border-gray-200 pt-12 pb-8">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-blue-600 text-xl font-bold mb-4">e-diarista</h2>
                    <p className="text-gray-600 text-sm">
                        Conectando as melhores profissionais de limpeza aos lares de Ananindeua e região.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 mb-4">Links úteis</h3>
                    <ul className="text-gray-500 text-sm mb-4">
                        <li><a href="/" className="hover:text-blue-600">Início</a></li>
                        <li><a href="/buscar" className="hover:text-blue-600">Encontrar Diarista</a></li>
                        <li><a href="/cadastro" className="hover:text-blue-600">Seja uma diarista</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold  text-gray-800 mb-4">Contato</h3>
                    <p className="text-gray-500 text-sm">suporte@ediaristas.com.br</p>
                    <div className="flex gap-4 mt-4">
                        {/* Ícones de Redes Sociais aqui */}
                        <a href="http://www.facebook.com.br" target="_blank" rel="noopener noreferrer">
                            <FiFacebook color="#E1306C" size={32}/>
                        </a>
                         <a href="http://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FiInstagram color="#E1306C" size={32}/>
                        </a>
                         <a href="http://www.x.com" target="_blank" rel="noopener noreferrer">
                            <X color="#E1306C" size={32}/>
                        </a>
                        
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-400 text-xs">
                © 2026 e-diaristas. Feito com ❤️ em Ananindeua.
            </div>
        </footer>
    )
}