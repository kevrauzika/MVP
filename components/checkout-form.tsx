// components/checkout-form.tsx
"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreditCard, User, FileText, Shield, Droplets, Baby } from "lucide-react"
import { checkoutSchema, type CheckoutFormValues } from "@/lib/schemas"
import { OPTIONAL_PRICES } from "./order-summary"

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormValues) => void;
  isLoading: boolean;
  onOptionalsChange: (optionals: { additionalInsurance: boolean, carWash: boolean, babySeat: boolean }) => void;
}

export default function CheckoutForm({ onSubmit, isLoading, onOptionalsChange }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control
  } = useForm<CheckoutFormValues>({
    // Validação desativada para DEV
    // resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'credit-card',
      acceptTerms: true, // Padrão true para facilitar
      additionalInsurance: false,
      carWash: false,
      babySeat: false,
    }
  });

  const paymentMethod = watch("paymentMethod");
  const additionalInsurance = watch("additionalInsurance");
  const carWash = watch("carWash");
  const babySeat = watch("babySeat");

  React.useEffect(() => {
    onOptionalsChange({
      additionalInsurance: !!additionalInsurance,
      carWash: !!carWash,
      babySeat: !!babySeat,
    });
  }, [additionalInsurance, carWash, babySeat, onOptionalsChange]);

  const formatPrice = (price: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Dados do Condutor */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <User className="w-6 h-6 mr-2 text-primary" />
          Dados do Condutor Principal
        </h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
              <input {...register("driverName")} className="w-full px-4 py-3 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
              <input {...register("driverEmail")} type="email" className="w-full px-4 py-3 border rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO DE OPCIONAIS */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Adicione Opcionais</h3>
        <div className="space-y-4">
          <Controller
            name="additionalInsurance"
            control={control}
            render={({ field }) => (
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:bg-orange-50 has-[:checked]:border-primary">
                <input type="checkbox" checked={!!field.value} onChange={field.onChange} className="w-5 h-5 text-primary rounded focus:ring-primary" />
                <div className="ml-4 flex-grow"><Shield className="inline w-5 h-5 mr-2 text-gray-600" />Seguro Adicional</div>
                <span className="font-semibold text-gray-700">+{formatPrice(OPTIONAL_PRICES.additionalInsurance)}/dia</span>
              </label>
            )}
          />
           <Controller
            name="carWash"
            control={control}
            render={({ field }) => (
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:bg-orange-50 has-[:checked]:border-primary">
                <input type="checkbox" checked={!!field.value} onChange={field.onChange} className="w-5 h-5 text-primary rounded focus:ring-primary" />
                <div className="ml-4 flex-grow"><Droplets className="inline w-5 h-5 mr-2 text-gray-600" />Ducha na Devolução</div>
                <span className="font-semibold text-gray-700">+{formatPrice(OPTIONAL_PRICES.carWash)}</span>
              </label>
            )}
          />
           <Controller
            name="babySeat"
            control={control}
            render={({ field }) => (
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:bg-orange-50 has-[:checked]:border-primary">
                <input type="checkbox" checked={!!field.value} onChange={field.onChange} className="w-5 h-5 text-primary rounded focus:ring-primary" />
                <div className="ml-4 flex-grow"><Baby className="inline w-5 h-5 mr-2 text-gray-600" />Bebê Conforto</div>
                <span className="font-semibold text-gray-700">+{formatPrice(OPTIONAL_PRICES.babySeat)}/dia</span>
              </label>
            )}
          />
        </div>
      </div>
      
      {/* Pagamento e Termos */}
      {/* ... (o resto do formulário permanece o mesmo) */}

      <div className="text-center">
        <button type="submit" disabled={isLoading} className="w-full md:w-auto px-12 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-lg hover:bg-primary/90 disabled:opacity-50">
          {isLoading ? "Processando..." : 'Finalizar Pedido'}
        </button>
      </div>
    </form>
  )
}