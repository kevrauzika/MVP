import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import type { Car } from "@/types/car"

interface OrderSummaryProps {
  car: Car
  days: number
  pickup: string
  dropoff: string
  pickupDate: string
  dropoffDate: string
}

export default function OrderSummary({ car, days, pickup, dropoff, pickupDate, dropoffDate }: OrderSummaryProps) {
  const dailyPrice = car.pricePerDay
  const subtotal = dailyPrice * days
  const taxes = subtotal * 0.1 // 10% de impostos
  const total = subtotal + taxes

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Resumo da Reserva</h3>

      {/* Veículo Selecionado */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Image
            src={car.image || "/placeholder.svg"}
            alt={car.name}
            width={80}
            height={60}
            className="rounded-lg object-cover"
          />
          <div>
            <h4 className="font-semibold text-gray-800">{car.name}</h4>
            <p className="text-gray-600 text-sm">{car.category}</p>
          </div>
        </div>
      </div>

      {/* Detalhes da Reserva */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-orange-600 mt-1" />
          <div className="flex-1">
            <p className="font-semibold text-gray-700 text-sm">Retirada</p>
            <p className="text-gray-600 text-sm">{pickup}</p>
            <p className="text-gray-600 text-sm">{formatDate(pickupDate)}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-orange-600 mt-1" />
          <div className="flex-1">
            <p className="font-semibold text-gray-700 text-sm">Devolução</p>
            <p className="text-gray-600 text-sm">{dropoff}</p>
            <p className="text-gray-600 text-sm">{formatDate(dropoffDate)}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Calendar className="w-5 h-5 text-orange-600 mt-1" />
          <div className="flex-1">
            <p className="font-semibold text-gray-700 text-sm">Período</p>
            <p className="text-gray-600 text-sm">
              {days} {days === 1 ? "dia" : "dias"}
            </p>
          </div>
        </div>
      </div>

      {/* Cálculo de Preços */}
      <div className="border-t pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Diária ({formatPrice(dailyPrice)} x {days} {days === 1 ? "dia" : "dias"})
          </span>
          <span className="text-gray-800">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Impostos e taxas</span>
          <span className="text-gray-800">{formatPrice(taxes)}</span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-gray-800">Total</span>
            <span className="text-xl font-bold text-orange-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="mt-6 p-4 bg-orange-50 rounded-lg">
        <h5 className="font-semibold text-gray-800 text-sm mb-2">Incluído na reserva:</h5>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Quilometragem ilimitada</li>
          <li>• Seguro básico</li>
          <li>• Assistência 24h</li>
          <li>• Cancelamento gratuito até 24h antes</li>
        </ul>
      </div>
    </div>
  )
}
