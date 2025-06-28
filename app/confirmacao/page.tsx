"use client"

import { useSearchParams } from "next/navigation"
import { CheckCircle, Calendar, MapPin, Car, Phone, Mail } from "lucide-react"
import Link from "next/link"

const mockCars = [
  {
    id: "1",
    name: "Chevrolet Onix",
    category: "Compacto",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Toyota Corolla",
    category: "Sedan",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Jeep Compass",
    category: "SUV",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function ConfirmationPage() {
  const searchParams = useSearchParams()

  const reservationNumber = searchParams.get("reservationNumber") || ""
  const carId = searchParams.get("carId") || ""
  const pickup = searchParams.get("pickup") || ""
  const dropoff = searchParams.get("dropoff") || ""
  const pickupDate = searchParams.get("pickupDate") || ""
  const dropoffDate = searchParams.get("dropoffDate") || ""
  const totalPrice = searchParams.get("totalPrice") || "0"
  const driverName = searchParams.get("driverName") || ""
  const driverEmail = searchParams.get("driverEmail") || ""

  const car = mockCars.find((c) => c.id === carId)

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(price))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header de Sucesso */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Reserva Confirmada!</h1>
            <p className="text-lg text-gray-600">Sua reserva foi realizada com sucesso. Confira os detalhes abaixo.</p>
          </div>

          {/* Número da Reserva */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Número da Reserva</h2>
              <div className="text-4xl font-bold text-orange-600 bg-orange-50 rounded-lg py-4 px-6 inline-block">
                {reservationNumber}
              </div>
            </div>
          </div>

          {/* Detalhes da Reserva */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Informações do Veículo */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Car className="w-6 h-6 mr-2 text-orange-600" />
                Veículo Reservado
              </h3>
              {car && (
                <div className="flex items-center space-x-4">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{car.name}</h4>
                    <p className="text-gray-600">{car.category}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Informações do Condutor */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Condutor Principal</h3>
              <div className="space-y-2">
                <p>
                  <strong>Nome:</strong> {driverName}
                </p>
                <p>
                  <strong>E-mail:</strong> {driverEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Detalhes do Aluguel */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Detalhes do Aluguel</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-700">Local de Retirada</p>
                    <p className="text-gray-600">{pickup}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-700">Data de Retirada</p>
                    <p className="text-gray-600">{formatDate(pickupDate)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-700">Local de Devolução</p>
                    <p className="text-gray-600">{dropoff}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-700">Data de Devolução</p>
                    <p className="text-gray-600">{formatDate(dropoffDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">Valor Total:</span>
                <span className="text-2xl font-bold text-orange-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Informações para Retirada */}
          <div className="bg-orange-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Informações para Retirada</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Endereço da Agência</h4>
                <p className="text-gray-600">
                  Rua das Flores, 123
                  <br />
                  Centro - São Paulo/SP
                  <br />
                  CEP: 01234-567
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Horário de Funcionamento</h4>
                <p className="text-gray-600">
                  Segunda a Sexta: 08h às 18h
                  <br />
                  Sábado: 08h às 14h
                  <br />
                  Domingo: Fechado
                </p>
              </div>
            </div>
          </div>

          {/* Contato de Suporte */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Precisa de Ajuda?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-semibold text-gray-700">Telefone</p>
                  <p className="text-gray-600">(11) 1234-5678</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-semibold text-gray-700">E-mail</p>
                  <p className="text-gray-600">suporte@carros.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="text-center space-y-4">
            <button
              onClick={() => window.print()}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all mr-4"
            >
              Imprimir Voucher
            </button>
            <Link
              href="/"
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all inline-block"
            >
              Nova Reserva
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
