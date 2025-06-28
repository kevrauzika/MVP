import SearchForm from "@/components/search-form"
import Hero from "@/components/hero"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Alugue seu carro ideal</h1>
            <p className="text-lg text-gray-600">Compare preços e encontre as melhores ofertas de aluguel de carros</p>
          </div>
          <SearchForm />
        </div>
      </div>
    </div>
  )
}
