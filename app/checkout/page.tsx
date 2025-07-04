// app/checkout/page.tsx
"use client"

import { useState, Suspense, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import CheckoutForm from "@/components/checkout-form"
import OrderSummary from "@/components/order-summary"
import type { Car } from "@/types/car"
import { cars as mockCars } from "@/lib/data"
import type { CheckoutFormValues } from "@/lib/schemas"

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedOptionals, setSelectedOptionals] = useState({
    additionalInsurance: false,
    carWash: false,
    babySeat: false,
  });

  const handleOptionalsChange = useCallback((optionals: {
    additionalInsurance: boolean;
    carWash: boolean;
    babySeat: boolean;
  }) => {
    setSelectedOptionals(optionals);
  }, []);

  const carId = searchParams.get("carId");
  const pickup = searchParams.get("pickup") || "";
  const dropoff = searchParams.get("dropoff") || "";
  const pickupDate = searchParams.get("pickupDate") || "";
  const dropoffDate = searchParams.get("dropoffDate") || "";

  const car = mockCars.find((c) => c.id === carId);

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Carro não encontrado</h1>
          <button onClick={() => router.push("/")} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Voltar ao início</button>
        </div>
      </div>
    );
  }

  const calculateDays = () => {
    if (pickupDate && dropoffDate) {
      const start = new Date(pickupDate);
      const end = new Date(dropoffDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays === 0 ? 1 : diffDays;
    }
    return 1;
  };

  const days = calculateDays();

  const handleSubmit = async (formData: CheckoutFormValues) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const reservationNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

      const params = new URLSearchParams({
        reservationNumber,
        carId: car.id,
        pickup: pickup || 'N/A',
        dropoff: dropoff || 'N/A',
        pickupDate: pickupDate || '',
        dropoffDate: dropoffDate || '',
        totalPrice: "0", 
        driverName: formData.driverName || "Celsinho",
        driverEmail: formData.driverEmail || "nao@informado.com",
        driverCPF: formData.driverCPF || "000.000.000-00",
      });

      const url = `/confirmacao?${params.toString()}`;
      router.push(url);

    } catch (error) {
      console.error("Falha ao processar a reserva:", error);
      alert("Houve um problema ao finalizar sua reserva. Por favor, tente novamente.");
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Finalizar Reserva</h1>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <CheckoutForm 
                onSubmit={handleSubmit} 
                isLoading={isLoading} 
                onOptionalsChange={handleOptionalsChange}
              />
            </div>
            <div className="lg:col-span-1">
              <OrderSummary
                car={car}
                days={days}
                pickup={pickup}
                dropoff={dropoff}
                pickupDate={pickupDate}
                dropoffDate={dropoffDate}
                selectedOptionals={selectedOptionals}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Carregando checkout...</div>}>
      <CheckoutPageContent />
    </Suspense>
  )
}