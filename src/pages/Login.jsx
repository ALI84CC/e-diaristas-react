import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../service/firebase";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Login() {
    
   const [userLogged, setUserLogged] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const unsubscrible = onAuthStateChanged(auth,(currentUser)=>{
            setUserLogged(currentUser)
        })

        return ()=> unsubscrible()
    },[])
    
    const handleLogin = async (e) => {
         e.preventDefault();
        try {
           const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("Usuário logado:", user.email);

            alert(`Ben-vindo(a) ${user.email}!`);
            navigate("/");
            
        } catch (error) {
            console.error("Erro no login:", error.code);
            if(error.code === "auth/user-not-found"){
                alert("Usário não encontrado. certifiquisse do Email ou senha !")
            }else {
                alert("E-mail ou senha inválidos.");
            }
           
        }
      }

      const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Deslogado com sucesso");
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    };

  return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6">
                {!userLogged ? (
                
                    <form onSubmit={handleLogin} className="space-y-6">
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
                        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition">
                            Entrar
                        </button>
                    </form>
                ) : (
               
                    <div className="space-y-4 text-center">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Olá, {userLogged.email}
                        </h2>
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition"
                        >
                            Sair da conta
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}