"use client"

import { useState } from "react"
import { Filter } from "lucide-react"

interface FilterSidebarProps {
  onFilter: (filters: any) => void
}

export default function FilterSidebar({ onFilter }: FilterSidebarProps) {
  const [filters, setFilters] = useState({
    category: "all",
    transmission: "all",
    minPrice: "",
    maxPrice: "",
    passengers: "all",
    airConditioning: false,
  })

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
        <Filter className="w-5 h-5 mr-2" />
        Filtros
      </h3>

      <div className="space-y-6">
        {/* Categoria */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Categoria</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Todas</option>
            <option value="Compacto">Compacto</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatch">Hatch</option>
          </select>
        </div>

        {/* Transmissão */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Transmissão</label>
          <select
            value={filters.transmission}
            onChange={(e) => handleFilterChange("transmission", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Todas</option>
            <option value="Manual">Manual</option>
            <option value="Automático">Automático</option>
          </select>
        </div>

        {/* Faixa de Preço */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Faixa de Preço (por dia)</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Mín"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Máx"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Número de Passageiros */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Passageiros</label>
          <select
            value={filters.passengers}
            onChange={(e) => handleFilterChange("passengers", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Qualquer</option>
            <option value="2">2 passageiros</option>
            <option value="4">4 passageiros</option>
            <option value="5">5 passageiros</option>
            <option value="7">7+ passageiros</option>
          </select>
        </div>

        {/* Ar Condicionado */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.airConditioning}
              onChange={(e) => handleFilterChange("airConditioning", e.target.checked)}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="ml-2 text-sm text-gray-700">Ar Condicionado</span>
          </label>
        </div>

        {/* Botão Limpar Filtros */}
        <button
          onClick={() => {
            const resetFilters = {
              category: "all",
              transmission: "all",
              minPrice: "",
              maxPrice: "",
              passengers: "all",
              airConditioning: false,
            }
            setFilters(resetFilters)
            onFilter(resetFilters)
          }}
          className="w-full py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  )
}
