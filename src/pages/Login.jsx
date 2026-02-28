import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../service/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
         e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login realizado com sucesso!");
            navigate("/");
        } catch (error) {
            console.error("Erro no login:", error.code);
            alert("E-mail ou senha inválidos.");
        }
      }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6">
                <h1 className="text-2xl font-bold text-center text-gray-800">Seja bem-vindo!</h1>
                
                <input
                    type="email" 
                    placeholder="seu@email.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full p-4 rounded-xl border border-gray-200"
                    required
                />

                <input
                    type="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full p-4 rounded-xl border border-gray-200"
                    required
                />
                
                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">
                    Entrar
                </button>
            </form>
        </main>
    );
} 