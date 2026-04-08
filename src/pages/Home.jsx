import Comofunciona from '../components/ComoFunciona'

export default function Home(){
    return(
        <div className="flex flex-col">
        <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        Pensou em limpeza? <br />
                        <span className="text-blue-600 font-black">Pensou onde procurar?</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
                        Nós da <span className="font-bold text-blue-600">e-diarista</span> conectamos você aos melhores profissionais de Ananindeua com segurança e praticidade.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
                        Encontrar Diarista
                        </button>
                        <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all">
                        Sou Profissional
                        </button>
                    </div>
                </div>

                <div className="flex-1">
                <img 
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800" 
                    alt="Diarista profissional"
                    className="rounded-3xl shadow-2xl transform md:rotate-3 hover:rotate-0 transition-transform duration-500"
                />
                </div>
            </div>
        </section>
        <Comofunciona />
      </div>  
    )
}