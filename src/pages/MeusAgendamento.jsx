import { useEffect, useState } from "react";
import { db, auth } from "../service/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, orderBy, updateDoc, doc } from "firebase/firestore";

export function MeusAgendamentos(){

    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState(null);

    const formatarData = (dataString) => {
    if (!dataString) return "Data não informada";
    
    // Divide a string '2026-03-17' em [2026, 03, 17]
    const [ano, mes, dia] = dataString.split("-");
    
    // Retorna no formato brasileiro
    return `${dia}/${mes}/${ano}`;
};

   const StatusBadge = ({ status }) => {
    const estilos = {
    pendente: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmado: "bg-blue-100 text-blue-800 border-blue-200",
    concluido: "bg-green-100 text-green-800 border-green-200",
    cancelado: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${estilos[status] || "bg-gray-100 text-gray-800"}`}>
      {status.toUpperCase()}
    </span>
  );
};

    useEffect(() => {
        const unsubscrible = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Busca o tipo do usuário
                    const userDoc = await getDocs(query(collection(db, 'usuarios'), where("uid", "==", user.uid)));
                    const type = userDoc.docs[0]?.data().tipo;
                    setUserType(type);

                    const campoFiltro = type === "diarista" ? "diaristaId" : "clienteId";
                    
                    // Agora o orderBy vai funcionar porque foi importado!
                    const q = query(
                        collection(db, 'agendamentos'),
                        where(campoFiltro, "==", user.uid),
                        orderBy("criadoEm", "desc")
                    );

                    const querySnapshot = await getDocs(q);
                    const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setAgendamentos(lista);
                } catch (error) {
                    console.error("Erro ao carregar agendamentos:", error);
                }
            }
            setLoading(false);
        });
        return () => unsubscrible();
    }, []);
    if (loading) return <div className="text-center mt-20 font-bold">Carregando agenda...</div>;

    const handleStatusUpdate = async (clienteId, novoStatus) =>{
        try{

            const docRef = doc(db,'agendamentos',clienteId)
            await updateDoc(docRef,{
                status: novoStatus,
                
            })

            setAgendamentos(prev => prev.map(item =>
                item.clienteId === clienteId ? {...item, status:novoStatus}: item
            ))

            alert(`Status atualizado para ${novoStatus}!`);
        } catch(error){
            console.error("Erro ao atualizar status:", error);
            alert("Falha ao atualizar o serviço.");
        }
    }

    return(
        <main className="min-h-screen bg-gray-50 p-6 pt-24 ">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    {userType === "diarista" ? "Serviços Agendados" : "Minhas Solicitações"}
                </h1>
                {agendamentos.length === 0 ?(
                    <div className="bg-white p-8 rounded-2xl text-center shadow-md"> 
                        <p className="text-gray-500 ">Nenhum agendamento encontrado.</p>
                    </div>

                ):(
                   <div className="grid gap-4">
                        {agendamentos.map((item) => ( // Usei parênteses aqui para o retorno ser automático
                            <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition-all hover:shadow-md">
                                <div className="flex items-center gap-4">
                                    {/* Avatar simples com a inicial */}
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                        {(userType === 'diarista' ? item.clienteNome : item.diaristaNome)?.charAt(0) || "U"}
                                    </div>
                                    
                                    <div>
                                        
                                        <p className="font-bold text-gray-800">
                                            {userType === 'diarista' ? item.clienteNome : item.diaristaNome}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Data: {formatarData(item.data)}
                                        </p>
                                    </div>
                                </div>

                                {/* Chamando o Badge que definimos */}
                                <StatusBadge status={item.status} />

                                <div className="flex gap-2 mt-4 md:mt-0">
                                    {userType == 'diarista' && item.status == 'pendente' &&(
                                        <button 
                                         onClick={() => handleStatusUpdate(item.id, 'confirmado')}
                                         className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition"
                                         >
                                            Confirmar
                                         </button>
                                    )}
                                 {userType == 'cliente' && item.status == 'confirmado' &&(
                                        <button 
                                         onClick={() => handleStatusUpdate(item.id, 'concluido')}
                                         className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition"
                                         >
                                            Concluir Serviço
                                         </button>
                                 )}
                                 {item.status === 'pendente' &&(
                                        <button 
                                         onClick={() => handleStatusUpdate(item.id, 'cancelado')}
                                         className="text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition"
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
        </main>
    )
}
