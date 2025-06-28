"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Clock } from "lucide-react"

export default function SearchForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    pickupDate: "",
    pickupTime: "10:00",
    dropoffDate: "",
    dropoffTime: "10:00",
    differentDropoff: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams({
      pickup: formData.pickup,
      dropoff: formData.differentDropoff ? formData.dropoff : formData.pickup,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      dropoffDate: formData.dropoffDate,
      dropoffTime: formData.dropoffTime,
    })

    router.push(`/resultados?${params.toString()}`)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Local de Retirada */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Local de Retirada
          </label>
          <input
            type="text"
            value={formData.pickup}
            onChange={(e) => handleInputChange("pickup", e.target.value)}
            placeholder="Digite a cidade, aeroporto ou endereço"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>

        {/* Checkbox para local diferente */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="differentDropoff"
            checked={formData.differentDropoff}
            onChange={(e) => handleInputChange("differentDropoff", e.target.checked)}
            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
          <label htmlFor="differentDropoff" className="ml-2 text-sm text-gray-700">
            Devolver em local diferente
          </label>
        </div>

        {/* Local de Devolução (condicional) */}
        {formData.differentDropoff && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Local de Devolução
            </label>
            <input
              type="text"
              value={formData.dropoff}
              onChange={(e) => handleInputChange("dropoff", e.target.value)}
              placeholder="Digite a cidade, aeroporto ou endereço"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
        )}

        {/* Data e Hora de Retirada */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Data de Retirada
            </label>
            <input
              type="date"
              value={formData.pickupDate}
              onChange={(e) => handleInputChange("pickupDate", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Hora de Retirada
            </label>
            <select
              value={formData.pickupTime}
              onChange={(e) => handleInputChange("pickupTime", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {Array.from({ length: 24 }, (_, i) => {
                const hour = i.toString().padStart(2, "0")
                return (
                  <option key={hour} value={`${hour}:00`}>
                    {hour}:00
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        {/* Data e Hora de Devolução */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Data de Devolução
            </label>
            <input
              type="date"
              value={formData.dropoffDate}
              onChange={(e) => handleInputChange("dropoffDate", e.target.value)}
              min={formData.pickupDate || new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Hora de Devolução
            </label>
            <select
              value={formData.dropoffTime}
              onChange={(e) => handleInputChange("dropoffTime", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {Array.from({ length: 24 }, (_, i) => {
                const hour = i.toString().padStart(2, "0")
                return (
                  <option key={hour} value={`${hour}:00`}>
                    {hour}:00
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        {/* Botão de Busca */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Buscar Carros
        </button>
      </form>
    </div>
  )
}
