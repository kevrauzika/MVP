import Image from "next/image"
import Link from "next/link"
import { Users, Luggage, Settings, Snowflake } from "lucide-react"
import type { Car } from "@/types/car"

interface CarCardProps {
  car: Car
  days: number
  searchParams: {
    pickup: string
    dropoff: string
    pickupDate: string
    dropoffDate: string
  }
}

export default function CarCard({ car, days, searchParams }: CarCardProps) {
  const totalPrice = car.pricePerDay * days

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  // Monta a URL com todos os parâmetros necessários
  const buildUrl = (baseUrl: string) => {
    const params = new URLSearchParams({
      carId: car.id,
      pickup: searchParams.pickup,
      dropoff: searchParams.dropoff,
      pickupDate: searchParams.pickupDate,
      dropoffDate: searchParams.dropoffDate,
    });
    return `${baseUrl}?${params.toString()}`;
  }

  const checkoutUrl = buildUrl('/checkout');
  const detailsUrl = buildUrl(`/car/${car.id}`); // <<--- ALTERAÇÃO AQUI

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="md:flex">
        <div className="md:w-1/3">
          <Image
            src={car.image || "/placeholder.svg"}
            alt={car.name}
            width={300}
            height={200}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>

        <div className="md:w-2/3 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
              <p className="text-gray-600">{car.category}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</div>
              <div className="text-sm text-gray-500">{formatPrice(car.pricePerDay)}/dia</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center"><Users className="w-4 h-4 mr-1" />{car.passengers} passageiros</div>
            <div className="flex items-center"><Luggage className="w-4 h-4 mr-1" />{car.luggage} bagagens</div>
            <div className="flex items-center"><Settings className="w-4 h-4 mr-1" />{car.transmission}</div>
            {car.airConditioning && <div className="flex items-center"><Snowflake className="w-4 h-4 mr-1" />Ar condicionado</div>}
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {car.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{feature}</span>
              ))}
              {car.features.length > 3 && <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">+{car.features.length - 3} mais</span>}
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <Link href={checkoutUrl} className="flex-1 py-3 bg-primary text-primary-foreground text-center font-semibold rounded-lg hover:bg-primary/90 transition-all">
              Selecionar
            </Link>
            {/* O link agora passa todos os parâmetros da busca */}
            <Link href={detailsUrl} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Ver Detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}