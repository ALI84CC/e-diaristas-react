import { X } from "lucide-react";
import { FiFacebook, FiInstagram } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-blue-600 text-xl font-bold mb-4">e-diarista</h2>
                    <p className="text-gray-600 text-sm">
                        Conectando as melhores profissionais de limpeza aos lares de Ananindeua e região.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 mb-4">Links úteis</h3>
                    <ul className="text-gray-600 text-sm space-y-1">
                        <li>
                            <a href="/" className="inline-block py-2 hover:text-blue-600">
                                Início
                            </a>
                        </li>
                        <li>
                            <a href="/buscar" className="inline-block py-2 hover:text-blue-600">
                                Encontrar Diarista
                            </a>
                        </li>
                        <li>
                            <a href="/cadastro" className="inline-block py-2 hover:text-blue-600">
                                Seja uma diarista
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 mb-4">Contato</h3>
                    <p className="text-gray-600 text-sm">suporte@ediaristas.com.br</p>
                    <div className="flex items-center gap-2 mt-4 -ml-2">
                        {/* Ícones com área de toque mínima de 48x48px */}
                        <a 
                            href="https://www.facebook.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="Acesse nossa página no Facebook"
                            className="min-w-[48px] min-h-[48px] flex items-center justify-center hover:opacity-80"
                        >
                            <FiFacebook color="#1877F2" size={28}/>
                        </a>
                        <a 
                            href="https://www.instagram.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="Acesse nossa página no Instagram"
                            className="min-w-[48px] min-h-[48px] flex items-center justify-center hover:opacity-80"
                        >
                            <FiInstagram color="#E1306C" size={28}/>
                        </a>
                        <a 
                            href="https://www.x.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="Acesse nossa página no X"
                            className="min-w-[48px] min-h-[48px] flex items-center justify-center hover:opacity-80"
                        >
                            <X color="#000000" size={28}/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600 text-xs">
                © 2026 e-diaristas. Feito com ❤️ em Ananindeua.
            </div>
        </footer>
    );
}