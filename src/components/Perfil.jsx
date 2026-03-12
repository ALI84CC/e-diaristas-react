import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../service/firebase"; 
import { useNavigate } from "react-router-dom";

export function Perfil() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userUid, setUserUid] = useState(null);
    
    // Estado único para o formulário
    const [formData, setFormData] = useState({
        nome: '',
        cidade: '',
        telefone: '',
        descricao: '',
        isMetropolitana: false,
        tipo: ''
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUserUid(currentUser.uid);
                try {
                    const docRef = doc(db, 'usuarios', currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const dados = docSnap.data();
                        setFormData({
                            nome: dados.nome || '',
                            cidade: dados.cidade || '',
                            telefone: dados.telefone || '',
                            descricao: dados.descricao || '',
                            isMetropolitana: dados.isMetropolitana || false,
                            tipo: dados.tipo || ''
                        });
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados:", error);
                }
            } else {
                // Se não houver usuário, redireciona para evitar erros de 'null'
                navigate("/login");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSalvar = async (e) => {
        e.preventDefault();
        
        // 🛡️ TRAVA DE SEGURANÇA: Só prossegue se o usuário estiver autenticado
        if (!auth.currentUser) {
            alert("Sessão expirada. Por favor, faça login novamente.");
            navigate("/login");
            return;
        }

        try {
            const docRef = doc(db, 'usuarios', userUid);
            
            const dadosParaGravar = {
                nome: formData.nome,
                email: auth.currentUser.email, // Protegido pela trava acima
                cidade: formData.cidade || "",
                telefone: formData.telefone || "",
                atualizadoEm: new Date()
            };

            if(formData.tipo && formData.tipo !== ""){
                dadosParaGravar.tipo = formData.tipo
            }

            if (formData.tipo === "diarista") {
                dadosParaGravar.descricao = formData.descricao || "";
                dadosParaGravar.isMetropolitana = formData.isMetropolitana || false;
            }

            // O 'merge: true' garante que o documento seja criado se não existir
            await setDoc(docRef, dadosParaGravar, { merge: true });
            alert("✅ Perfil salvo com sucesso!");
            
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("❌ Erro ao salvar: " + error.message);
        }
    };

    // ⏳ Tela de carregamento para evitar leitura de dados nulos
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-xl font-bold text-blue-600 animate-pulse">Carregando seu perfil...</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4 pt-24">
            <form onSubmit={handleSalvar} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-5">
                <h1 className="text-2xl font-bold text-center text-gray-800">Meu Perfil</h1>
                <p className="text-center text-gray-500 text-sm mb-4">Mantenha seus dados atualizados</p>
                
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Nome Completo</label>
                        <input 
                            name="nome" 
                            value={formData.nome} 
                            onChange={handleChange} 
                            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-blue-500" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Sua Cidade</label>
                        <input 
                            name="cidade" 
                            value={formData.cidade} 
                            onChange={handleChange} 
                            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-blue-500" 
                            placeholder="Ex: Ananindeua"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Telefone de Contato</label>
                        <input 
                            name="telefone" 
                            value={formData.telefone} 
                            onChange={handleChange} 
                            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-blue-500" 
                            placeholder="(91) 9XXXX-XXXX"
                        />
                    </div>

                    {formData.tipo === "diarista" && (
                        <>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-600 ml-1">Sobre mim (Bio)</label>
                                <textarea 
                                    name="descricao" 
                                    value={formData.descricao} 
                                    onChange={handleChange} 
                                    className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-blue-500 h-24 resize-none" 
                                />
                            </div>
                            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-xl">
                                <input 
                                    type="checkbox" 
                                    name="isMetropolitana" 
                                    checked={formData.isMetropolitana} 
                                    onChange={handleChange} 
                                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500" 
                                />
                                <label className="text-sm text-blue-800 font-medium">Atende região metropolitana?</label>
                            </div>
                        </>
                    )}
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
                >
                    Salvar Alterações
                </button>         
            </form>
        </main>
    );
}