import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../service/firebase";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

export default function Login() {
  const [userLogged, setUserLogged] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserLogged(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário logado:", userCredential.user.email);
      navigate("/");
    } catch (error) {
      console.error("Erro no login:", error.code);
      
      // Tratamento unificado de erros de credencial para o Firebase v10+
      if (
        error.code === "auth/invalid-credential" || 
        error.code === "auth/user-not-found" || 
        error.code === "auth/wrong-password"
      ) {
        setErrorMessage("E-mail ou senha incorretos.");
      } else {
        setErrorMessage("Erro ao realizar login. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
            
            {errorMessage && (
              <div className="p-3 bg-red-100 text-red-700 text-sm rounded-xl text-center font-medium border border-red-200">
                {errorMessage}
              </div>
            )}

            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
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