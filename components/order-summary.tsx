// components/order-summary.tsx
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import type { Car } from "@/types/car"
import { format, parseISO } from "date-fns"

// Preços dos opcionais (poderiam vir de uma API)
export const OPTIONAL_PRICES = {
  additionalInsurance: 35, // por dia
  carWash: 60, // taxa única
  babySeat: 50, // por dia
};

interface OrderSummaryProps {
  car: Car;
  days: number;
  pickup: string;
  dropoff: string;
  pickupDate: string;
  dropoffDate: string;
  // Novas props para os opcionais
  selectedOptionals: {
    additionalInsurance: boolean;
    carWash: boolean;
    babySeat: boolean;
  };
}

export default function OrderSummary({ 
  car, 
  days, 
  pickup, 
  dropoff, 
  pickupDate, 
  dropoffDate,
  selectedOptionals 
}: OrderSummaryProps) {
  const dailyPrice = car.pricePerDay;
  const subtotal = dailyPrice * days;
  
  // Cálculo dos custos dos opcionais
  const insuranceCost = selectedOptionals.additionalInsurance ? OPTIONAL_PRICES.additionalInsurance * days : 0;
  const washCost = selectedOptionals.carWash ? OPTIONAL_PRICES.carWash : 0;
  const babySeatCost = selectedOptionals.babySeat ? OPTIONAL_PRICES.babySeat * days : 0;
  
  const optionalsTotal = insuranceCost + washCost + babySeatCost;
  
  const totalBeforeTaxes = subtotal + optionalsTotal;
  const taxes = totalBeforeTaxes * 0.1; // 10% de impostos sobre tudo
  const total = totalBeforeTaxes + taxes;

  const formatPrice = (price: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);
  const formatDate = (dateString: string) => dateString ? format(parseISO(dateString), "dd/MM/yyyy") : 'N/A';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Resumo da Reserva</h3>

      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Image src={car.image || "/placeholder.svg"} alt={car.name} width={80} height={60} className="rounded-lg object-cover" />
          <div>
            <h4 className="font-semibold text-gray-800">{car.name}</h4>
            <p className="text-gray-600 text-sm">{car.category}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6 border-b pb-6">
        <div className="flex items-start space-x-3"><MapPin className="w-5 h-5 text-primary mt-1" /><div className="flex-1"><p className="font-semibold text-gray-700 text-sm">Retirada</p><p className="text-gray-600 text-sm">{pickup} - {formatDate(pickupDate)}</p></div></div>
        <div className="flex items-start space-x-3"><MapPin className="w-5 h-5 text-primary mt-1" /><div className="flex-1"><p className="font-semibold text-gray-700 text-sm">Devolução</p><p className="text-gray-600 text-sm">{dropoff} - {formatDate(dropoffDate)}</p></div></div>
        <div className="flex items-start space-x-3"><Calendar className="w-5 h-5 text-primary mt-1" /><div className="flex-1"><p className="font-semibold text-gray-700 text-sm">Período</p><p className="text-gray-600 text-sm">{days} {days === 1 ? "diária" : "diárias"}</p></div></div>
      </div>

      <div className="border-b pt-4 pb-4 space-y-3">
        <div className="flex justify-between text-sm"><span className="text-gray-600">Diárias ({formatPrice(dailyPrice)} x {days})</span><span className="text-gray-800">{formatPrice(subtotal)}</span></div>
        
        {/* Exibição dinâmica dos opcionais */}
        {insuranceCost > 0 && <div className="flex justify-between text-sm"><span className="text-gray-600">Seguro Adicional</span><span className="text-gray-800">{formatPrice(insuranceCost)}</span></div>}
        {washCost > 0 && <div className="flex justify-between text-sm"><span className="text-gray-600">Ducha na Devolução</span><span className="text-gray-800">{formatPrice(washCost)}</span></div>}
        {babySeatCost > 0 && <div className="flex justify-between text-sm"><span className="text-gray-600">Bebê Conforto</span><span className="text-gray-800">{formatPrice(babySeatCost)}</span></div>}
        
        <div className="flex justify-between text-sm"><span className="text-gray-600">Impostos e taxas</span><span className="text-gray-800">{formatPrice(taxes)}</span></div>
      </div>

      <div className="pt-3">
        <div className="flex justify-between"><span className="text-lg font-bold text-gray-800">Total</span><span className="text-xl font-bold text-primary">{formatPrice(total)}</span></div>
      </div>
    </div>
  )
}