import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">Alugue o carro perfeito para sua viagem</h1>
            <p className="text-xl mb-8 opacity-90">
              Compare preços, escolha entre centenas de veículos e reserve com segurança. Sua aventura começa aqui!
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                Cancelamento gratuito
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                Sem taxas ocultas
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                Suporte 24/7
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Carros para aluguel"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
