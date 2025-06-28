"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import CheckoutForm from "@/components/checkout-form"
import OrderSummary from "@/components/order-summary"
import type { Car } from "@/types/car"

const mockCars: Car[] = [
  {
    id: "1",
    name: "Chevrolet Onix",
    category: "Compacto",
    image: "/placeholder.svg?height=200&width=300",
    transmission: "Manual",
    passengers: 5,
    luggage: 2,
    airConditioning: true,
    pricePerDay: 89,
    features: ["Ar Condicionado", "Direção Hidráulica", "Vidros Elétricos"],
  },
  {
    id: "2",
    name: "Toyota Corolla",
    category: "Sedan",
    image: "/placeholder.svg?height=200&width=300",
    transmission: "Automático",
    passengers: 5,
    luggage: 3,
    airConditioning: true,
    pricePerDay: 129,
    features: ["Ar Condicionado", "Câmbio Automático", "GPS", "Bluetooth"],
  },
  {
    id: "3",
    name: "Jeep Compass",
    category: "SUV",
    image: "/placeholder.svg?height=200&width=300",
    transmission: "Automático",
    passengers: 5,
    luggage: 4,
    airConditioning: true,
    pricePerDay: 189,
    features: ["Ar Condicionado", "Câmbio Automático", "GPS", "4x4", "Teto Solar"],
  },
]

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const carId = searchParams.get("carId")
  const pickup = searchParams.get("pickup") || ""
  const dropoff = searchParams.get("dropoff") || ""
  const pickupDate = searchParams.get("pickupDate") || ""
  const dropoffDate = searchParams.get("dropoffDate") || ""

  const car = mockCars.find((c) => c.id === carId)

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Carro não encontrado</h1>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  const calculateDays = () => {
    if (pickupDate && dropoffDate) {
      const start = new Date(pickupDate)
      const end = new Date(dropoffDate)
      return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    }
    return 1
  }

  const days = calculateDays()

  const handleSubmit = async (formData: any) => {
    setIsLoading(true)

    // Simular chamada para API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Gerar número de reserva
    const reservationNumber = Math.random().toString(36).substr(2, 9).toUpperCase()

    // Redirecionar para página de confirmação
    const params = new URLSearchParams({
      reservationNumber,
      carId: car.id,
      pickup,
      dropoff,
      pickupDate,
      dropoffDate,
      totalPrice: (car.pricePerDay * days).toString(),
      driverName: formData.driverName,
      driverEmail: formData.driverEmail,
    })

    router.push(`/confirmacao?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Finalizar Reserva</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                car={car}
                days={days}
                pickup={pickup}
                dropoff={dropoff}
                pickupDate={pickupDate}
                dropoffDate={dropoffDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
