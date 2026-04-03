import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../service/firebase"; 
import { addDoc, collection, doc,  getDoc, getDocs, query, where } from "firebase/firestore"; 
import { Calendar, Info } from "lucide-react";
import {auth } from '../service/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";


export default function DetalhesDiarista(){

    const {id} = useParams()
    const [diaristaEncontrada, setDiaristaEncontrada] = useState(null);
    const navigate = useNavigate()
    const[ carregando, setCarregando] = useState(true)
    const [dataAgendamento, setDataAgendamento] = useState("")
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[usuarioLogado,setUsuarioLogado] = useState("")
    const[isModalOpen, SetIsModalOpen] = useState(false)
    const[enviando, setEnviando] = useState(false)


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(use)=>{
            setUsuarioLogado(use)
        })
        return  () => unsubscribe()
    },[])

    useEffect(()=>{
        const buscarDiarista = async () =>{
            try{
                setCarregando(true)

                const docRef = doc(db,"usuarios",id)
                const docSnap = await getDoc(docRef)

                if(docSnap.exists()){
                    setDiaristaEncontrada({id: docSnap.id,...docSnap.data()})
                }
              } 
                catch (error) {
                    console.error("Erro ao buscar detalhes:", error);
                } finally {
                setCarregando(false);
                }
                };
             if (id) buscarDiarista();
    }, [id]);

     const handleLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login Efetuado");
        } catch (error) {
            console.error("Erro no login: ", error.code);
        }
    }

    const handleAgendamento = async (e) => {

        if(!auth.currentUser){
            alert("Você precisa está logado para realizar um agendamento")
            navigate("/login")
            return
        }
         e.preventDefault()


        if(!dataAgendamento){
            alert("⚠️ Por favor, selecione uma data para o serviço antes de confirmar.")
            return
        }
        
        if (enviando) return
            setEnviando(true)

        try{

         const q = query(
            collection(db, "agendamentos"), 
            where("clienteId", "==", usuarioLogado.uid),
            where("data", "==", dataAgendamento)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            alert("Você já tem um agendamento para esta data!");
            setEnviando(false);
            return;
        }

        const clienteRef = doc(db,'usuarios',usuarioLogado.uid)
        const clienteSnap = await getDoc(clienteRef)
        const telefoneCliente = clienteSnap.exists() ? clienteSnap.data().telefone : ""
        
        
        await addDoc(collection(db,'agendamentos'),{
                
                clienteId: usuarioLogado.uid,
                clienteNome : clienteSnap.exists() ? clienteSnap.data().nome : 'Cliente',
                clienteTelefone: telefoneCliente,


                diaristaId: id,
                diaristaNome:diaristaEncontrada.nome,
                diaristaTelefone: diaristaEncontrada.telefone || "",

                data:dataAgendamento,
                status:'pendente',
                avaliacao: false,
                criadoEm: new Date()
            })

            if(docSnap.exists()){
                const dados = {id: docSnap.id, ...docSnap.data()};
                console.log("🔍 Dados da Diarista para o WhatsApp:", dados.telefone); // Verifique se aparece o número no console
                setDiaristaEncontrada(dados);
            }

             alert("📅 Agendamento realizado com sucesso!");
             setDataAgendamento("");
             navigate("/meus-agendamentos")

        } 
        catch (error){
            console.error("Erro ao salvar o agendamento",error)
             alert("Erro ao processar agendamento. Tente novamente.");
        } finally{
            setEnviando(false)
        }

        {/*const dataFormatada = new Date(dataAgendamento).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        alert(`📅 Agendamento solicitado!\n\nProfissional: ${diaristaEncontrada.nome}\nData: ${dataFormatada}\n\nEntraremos em contato para confirmar!.`) */}
    }

  
   if (carregando) return <div className="text-center py-20">Carregando detalhes...</div>;

   if (!diaristaEncontrada) return <div className="text-center py-20">Profissional não encontrada</div>;

    return(
        <main className="min-h-screen bg-gray-50 py-10 px-4">
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl ">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Entrar para Agendamento</h2>
                        <p className="text-gray mb-6"> Você precisa esta logado para finalizar o agendamento</p>

                        <div className="space-y-4">
                            <input
                            type="email"
                            placeholder="E-mail"
                            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"  
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                            type="password"
                            placeholder="senha"
                            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" 
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                onClick={()=>handleLogin(email,password)
                                    .then(()=>SetIsModalOpen(false))}
                                className="w-full bg-blue-600  text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all"
                            > Entrar e Confirmar
                            </button>
                            <button
                            onClick={()=>SetIsModalOpen(false)}
                            className="w-full text-gray-400 text-sm font-medium hover:text-gray-600" 
                            >
                                Cancelar  
                            </button>        
                    </div>
                    </div>
                </div>
        )}
            <div className=" max-w-2xl mx-auto flex flex-col items-center space-y-6">
                {/*botão de retorno*/}
                <div className="w-full max-w-2xl">
                  <button
                    onClick={()=>navigate(-1)}
                    className="mb-6 flex gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium group">
                    <span className="group-hover:-translate-x-1 transition-transform">
                        ←voltar para lista
                    </span>
                    </button>
                </div>
                {/*primeiro card */}
             <section className="w-full max-w bg-white rounded-3xl border border-gray-300 shadow-md overflow-hidden" >
                <div className="p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <img 
                        src={diaristaEncontrada.foto} 
                        className="w-48 h-48 rounded-2xl object-cover shadow-md border border-gray-100" 
                        alt={diaristaEncontrada.nome} />
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 ">{diaristaEncontrada.nome}</h1>
                            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                                Profissional Verificada
                            </span>    
                            <p className="text-gray-500 mt-3 flex items-center justify-center md:justify-start gap-1">
                                ⭐ <span className="text-yellow-500 font-bold">{diaristaEncontrada.avaliacao} (45 avaliações)</span>
                            </p>    
                        </div>
                    </div>  

                     <div className="mt-10 border-t border-gray-100 pt-8"> 
                        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                           <Info size={20} className="text-blue-600"  />Sobre Mim:  
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg italic">
                            {diaristaEncontrada.descricao}
                        </p>
                      
                    </div>           
                </div>
            </section>
                 {/*segunda sessão: Formulario de contratação*/}
            <section className="w-full max-w bg-white rounded-3xl border border-gray-200 sticky p-8">
                <div className="max-w-md max-auto text-center">
                    <h3 className="text-xl font-semibold mb-4 text-gray-500 uppercase tracking-wider text-center">
                        Contrate agora
                    </h3>
                   <div className="bg-blue-50 p-2 rounded-lg inline-block">
                        <span className="text-blue-600 font-bold">
                            {/* Usamos as chaves apenas para envolver a variável ou a lógica */}
                            Valor/Hora: R$ {diaristaEncontrada.valor_hora || 100}
                        </span>
                    </div>
                                    
                    <form className="space-y-6 mt-8">
                    <div className="text-left">
                        <label className="flex items-center  text-sm font-medium text-gray-700 mb-1">
                            <Calendar size={18} className="text-blue-500 px-1 " />
                            Data do Serviço
                        </label>
                        <input 
                        type="date" 
                        value={dataAgendamento}
                        onChange={(e) => setDataAgendamento(e.target.value)}
                        min={new Date().toISOString().split("T")[0]} 
                        className="w-full mt-1 p-4 rounded-2xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                    </div>
                    <button
                        onClick={handleAgendamento} 
                        type="button" 
                        disabled={enviando}
                        className="w-full bg-blue-600 text-white font-extrabold py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95">
                        {enviando ? "Salvando Agendamento..." : "Confirmar Agendamento"}
                    </button>
                    </form>
                </div> 
            </section>
        </div>
    </main>
    )            
}