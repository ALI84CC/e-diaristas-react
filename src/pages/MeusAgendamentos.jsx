import { useEffect, useState } from "react";
import { db, auth } from "../service/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, orderBy, updateDoc, doc, runTransaction, onSnapshot } from "firebase/firestore";
import RatingModal from "../components/RatingModal";

export default function MeusAgendamentos() {
   
    // 1. ESTADOS (Sempre no topo)
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selecdAgendamento, setSelecdAgendamento] = useState(null);

    // 2. FUNÇÕES DE UTILIDADE
    const formatarData = (dataString) => {
        if (!dataString) return "Data não informada";
        const [ano, mes, dia] = dataString.split("-");
        return `${dia}/${mes}/${ano}`;
    };

    const abrirWhatsapp = (telefone, nomeOutraPessoa, data) => {
    const mensagem = encodeURIComponent(
        `Olá ${nomeOutraPessoa}, sou do app e-diaristas. Gostaria de combinar os detalhes da faxina do dia ${formatarData(data)}.`
    );
    window.open(`https://wa.me/55${telefone.replace(/\D/g, "")}?text=${mensagem}`, "_blank");
};

    // 3. FUNÇÃO DE AVALIAÇÃO (Precisa estar aqui para o Modal enxergar)
    const handleConfirmRating = async (newScore) => {
        if (!selecdAgendamento) return;

        // IMPORTANTE: Verifique se sua coleção é 'usuarios' ou 'usuario'
        const diaristaRef = doc(db, 'usuarios', selecdAgendamento.diaristaId);
        const agendamentoRef = doc(db, 'agendamentos', selecdAgendamento.id);

        try {
            await runTransaction(db, async (transaction) => {
                const diaristaDoc = await transaction.get(diaristaRef);
                if (!diaristaDoc.exists()) throw "Diarista não encontrada";

                const data = diaristaDoc.data();
                const currentAvg = Number(data.avgRating || 0);
                const currentCount = Number(data.numRatings || 0);

                const newCount = currentCount + 1;
                const newAvg = ((currentAvg * currentCount) + newScore) / newCount;

                transaction.update(diaristaRef, {
                    avgRating: Number(newAvg.toFixed(2)),
                    numRatings: newCount
                });

                transaction.update(agendamentoRef, { avaliacao: true });
            });

            // Atualiza a lista local para o botão sumir
            setAgendamentos(prev => prev.map(item =>
                item.id === selecdAgendamento.id ? { ...item, avaliacao: true } : item
            ));

            setModalOpen(false);
           alert("⭐ Obrigado! Avaliação enviada.");
        } catch (e) {
            console.error("Erro na transação:", e);
            alert("Erro ao salvar avaliação. Tente novamente.");
        }
    };

    const handleStatusUpdate = async (id, novoStatus) => {
        try {
            const docRef = doc(db, 'agendamentos', id);
            await updateDoc(docRef, { status: novoStatus });
            setAgendamentos(prev => prev.map(item =>
                item.id === id ? { ...item, status: novoStatus } : item
            ));
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
        }
    };

    // 4. COMPONENTE AUXILIAR (Badge)
    const StatusBadge = ({ status }) => {
        const estilos = {
            pendente: "bg-yellow-100 text-yellow-800 border-yellow-200",
            confirmado: "bg-blue-100 text-blue-800 border-blue-200",
            concluido: "bg-green-100 text-green-800 border-green-200",
            cancelado: "bg-red-100 text-red-800 border-red-200",
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${estilos[status] || "bg-gray-100"}`}>
                {status?.toUpperCase()}
            </span>
        );
    };


useEffect(() => {
    let unsubSnap = null; // Variável para armazenar o encerramento do snapshot

    const unsubAuth = onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // 1. Busca o tipo do usuário
                const userDocQuery = query(collection(db, 'usuarios'), where("uid", "==", user.uid));
                const userDocSnap = await getDocs(userDocQuery);
                const type = userDocSnap.docs[0]?.data().tipo;
                setUserType(type);

                // 2. Query de agendamentos
                const campoFiltro = type === "diarista" ? "diaristaId" : "clienteId";
                const q = query(
                    collection(db, 'agendamentos'),
                    where(campoFiltro, "==", user.uid),
                    orderBy("criadoEm", "desc")
                );

                // 3. Ativa o Snapshot e guarda a função de cancelar na variável externa
                unsubSnap = onSnapshot(q, (querySnapshot) => {
                    const lista = querySnapshot.docs.map(doc => ({ 
                        id: doc.id, 
                        ...doc.data() 
                    }));
                    setAgendamentos(lista);
                    setLoading(false);
                }, (error) => {
                    console.error("Erro no Snapshot:", error);
                    setLoading(false);
                });

            } catch (error) {
                console.error("Erro ao carregar:", error);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    });

    // O Cleanup agora limpa tanto a Autenticação quanto o Snapshot
    return () => {
        unsubAuth();
        if (unsubSnap) unsubSnap();
    };
}, []);

    if (loading) return <div className="text-center mt-20 font-bold">Carregando agenda...</div>;

    // 6. RENDERIZAÇÃO (JSX)
    return (
        <main className="min-h-screen bg-gray-50 p-6 pt-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    {userType === "diarista" ? "Serviços Agendados" : "Minhas Solicitações"}
                </h1>

                {agendamentos.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl text-center shadow-md text-gray-500">
                        Nenhum agendamento encontrado.
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {agendamentos.map((item) => (
                            <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                        {(userType === 'diarista' ? item.clienteNome : item.diaristaNome)?.charAt(0) || "U"}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">
                                            {userType === 'diarista' ? item.clienteNome : item.diaristaNome}
                                        </p>

                                        {item.status === 'confirmado' && (
                                        <button 
                                            onClick={() => abrirWhatsapp(
                                                userType === 'diarista' ? item.clienteTelefone : item.diaristaTelefone, 
                                                userType === 'diarista' ? item.clienteNome : item.diaristaNome, 
                                                item.data
                                            )}
                                            className="text-xs text-green-600 font-bold flex items-center gap-1 hover:underline mt-1"
                                        >
                                            💬 Combinar detalhes
                                        </button>
                                    )}

                                    <p className="text-sm text-gray-500">Data: {formatarData(item.data)}</p>
                                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                   <StatusBadge status={item.status} />

                                    {/* 1. VISÃO DA DIARISTA */}
                                    {userType === 'diarista' && (
                                        <>
                                            {/* Se está pendente, ela confirma e vai para 'confirmado' */}
                                            {item.status === 'pendente' && (
                                                <button 
                                                    onClick={() => handleStatusUpdate(item.id, 'confirmado')} 
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
                                                >
                                                    Confirmar Trabalho
                                                </button>
                                            )}
                                            {/* Se está confirmado, ela agora pode 'Finalizar' */}
                                            {item.status === 'confirmado' && (
                                                <button 
                                                    onClick={() => handleStatusUpdate(item.id, 'concluido')} 
                                                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
                                                >
                                                    Finalizar Trabalho
                                                </button>
                                            )}
                                        </>
                                    )}

                                    {/* 2. VISÃO DO CLIENTE */}
                                    {userType === 'cliente' && (
                                        <>
                                            {/* O botão de avaliar SÓ aparece se o status for exatamente 'concluido' */}
                                            {item.status === 'concluido' && item.avaliacao !== true && (
                                                <button 
                                                    onClick={() => { setSelecdAgendamento(item); setModalOpen(true); }}
                                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-bold animate-bounce"
                                                >
                                                    Avaliar ★
                                                </button>
                                            )}
                                        </>
                                    )}
                                    
                                    {/* Botão de Cancelar (Geralmente disponível apenas enquanto Pendente) */}
                                    {item.status === 'pendente' && (
                                        <button 
                                            onClick={() => handleStatusUpdate(item.id, 'cancelado')} 
                                            className="text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium"
                                        >
                                            Cancelar
                                        </button>
                                    )}
                               </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* O MODAL DEVE FICAR AQUI, FORA DO MAP MAS DENTRO DO MAIN */}
            <RatingModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                onConfirm={handleConfirmRating}
                diaristaNome={selecdAgendamento?.diaristaNome}
            />
        </main>
    );
}