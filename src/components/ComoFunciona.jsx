import { Search, CalendarDays, MessageCircle, Star } from "lucide-react";

export default function ComoFunciona() {
  const passos = [
    {
      icon: Search,
      title: "1. Encontre a Profissional",
      description: "Busque diaristas por avaliação, preço e região de Ananindeua.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: CalendarDays,
      title: "2. Agende o Dia",
      description: "Escolha a data ideal no calendário e confirme a solicitação.",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: MessageCircle,
      title: "3. Combine Detalhes",
      description: "Use o botão do WhatsApp para acertar os últimos detalhes.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Star,
      title: "4. Avalie o Serviço",
      description: "Conte como foi sua experiência e ajude a comunidade.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <section className="py-24 bg-white rounded-3xl border border-gray-100 shadow-sm mt-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          É simples assim...
        </h2>
        <p className="text-gray-500 text-center mb-16 max-w-lg mx-auto">
          Conectamos você às melhores profissionais de limpeza em apenas 4 passos rápidos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {passos.map((passo, index) => {
            const Icone = passo.icon; // Importante para renderizar o componente
            return (
              <div key={index} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center group hover:border-blue-100 hover:bg-white transition-all duration-300 hover:shadow-lg">
                
                {/* O ÍCONE COM FUNDO COLORIDO */}
                <div className={`${passo.bgColor} p-6 rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  <Icone className={`w-12 h-12 ${passo.color}`} strokeWidth={2} />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {passo.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {passo.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}