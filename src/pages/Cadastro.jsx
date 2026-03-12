import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../service/firebase"; 
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";

export default function Cadastro() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("cliente"); 
  const [cidade, setCidade] = useState("");
  const [ telefone, setTelefone] = useState("")
  const [descricao, setDescricao] = useState("");
  const [isMetropolitana, setIsMetropolitana] = useState(false);
  const [ foto, setFoto] = useState("")
  
  const navigate = useNavigate();

  const signupWithEmail = async (e) => {
    e.preventDefault();
    if (!email || !password || !nome) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      // 2. Criação no Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 3. Montagem do objeto de perfil
      const dadosUsuario = {
        uid: user.uid,
        nome: nome,
        email: email,
        tipo: tipo,
        cidade: cidade || "Não informada",
        telefone: telefone || "Não informado",
        descricao: descricao || "",
        isMetropolitana : isMetropolitana,
        avaliacao: 5,
        criadoEm: new Date()
      };

    
      await setDoc(doc(db, "usuarios", user.uid), dadosUsuario);
      navigate("/buscar");


      console.log("Perfil criado com sucesso!");
      navigate("/buscar");
    } catch (error) {
      console.error("Erro no cadastro:", error.code, error.message);
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={signupWithEmail} className="w-full max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Crie sua conta</h2>
        
        <div className="space-y-4">
          {/* Campo Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input 
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full pl-3 pr-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Seu nome"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <div className="relative mt-1">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="email@exemplo.com"
              />
              <MdOutlineEmail className="absolute right-3 top-3 text-gray-400" />
            </div>

            <div className="relative">
              <label className="block text-sm  font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <input
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Mínimo de 6 caracteres"/>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)} // Adicionado o '>'
                    required
                    className="w-full pl-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Cidade Residente"
                  />
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)} // Corrigido
                    required
                    className="w-full pl-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="(91) 98474-4563"
                  />
                </div>
            </div>
          </div>

          {/* Seleção de Tipo (Simplificada para teste) */}
          <div className="flex gap-4 py-2">
            <button 
              type="button" 
              onClick={() => setTipo("cliente")}
              className={`flex-1 py-2 rounded-lg border ${tipo === 'cliente' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              Sou Cliente
            </button>
            <button 
              type="button" 
              onClick={() => setTipo("diarista")}
              className={`flex-1 py-2 rounded-lg border ${tipo === 'diarista' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              Sou Diarista
            </button>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Cadastrar
          </button>
        </div>
      </form>
      {tipo === "diarista" && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <input 
            placeholder="URL da sua foto (ex:link do unsplash)"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            className="w-full p-2 border rounded"
            />
            <input 
            type="text" 
            placeholder="Sua cidade (ex:Ananindeua"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="w-full p-2 border rounded"/>
            
            <textarea 
            placeholder="conte um pouco a sua experiência"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-2 border rounded" />


             <label className="flex items-center gap-2">
                <input 
                type="checkbox"
                cheked={isMetropolitana}
                onChange={(e) => setIsMetropolitana(e.target.value)}
                />
                Atende região metropolitana?
              </label> 
          </div>
      )}
    </section>
  );
}