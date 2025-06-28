"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import CarCard from "@/components/car-card"
import FilterSidebar from "@/components/filter-sidebar"
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

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [cars, setCars] = useState<Car[]>(mockCars)
  const [filteredCars, setFilteredCars] = useState<Car[]>(mockCars)
  const [sortBy, setSortBy] = useState("price-asc")

  const pickupLocation = searchParams.get("pickup") || ""
  const dropoffLocation = searchParams.get("dropoff") || ""
  const pickupDate = searchParams.get("pickupDate") || ""
  const dropoffDate = searchParams.get("dropoffDate") || ""

  const calculateDays = () => {
    if (pickupDate && dropoffDate) {
      const start = new Date(pickupDate)
      const end = new Date(dropoffDate)
      return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    }
    return 1
  }

  const days = calculateDays()

  const handleSort = (value: string) => {
    setSortBy(value)
    const sorted = [...filteredCars].sort((a, b) => {
      switch (value) {
        case "price-asc":
          return a.pricePerDay - b.pricePerDay
        case "price-desc":
          return b.pricePerDay - a.pricePerDay
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })
    setFilteredCars(sorted)
  }

  const handleFilter = (filters: any) => {
    let filtered = cars

    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((car) => car.category === filters.category)
    }

    if (filters.transmission && filters.transmission !== "all") {
      filtered = filtered.filter((car) => car.transmission === filters.transmission)
    }

    if (filters.minPrice || filters.maxPrice) {
      filtered = filtered.filter((car) => {
        const price = car.pricePerDay
        return (!filters.minPrice || price >= filters.minPrice) && (!filters.maxPrice || price <= filters.maxPrice)
      })
    }

    setFilteredCars(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>
              <strong>Retirada:</strong> {pickupLocation}
            </span>
            <span>
              <strong>Devolução:</strong> {dropoffLocation}
            </span>
            <span>
              <strong>Período:</strong> {pickupDate} até {dropoffDate} ({days} dias)
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterSidebar onFilter={handleFilter} />
          </div>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{filteredCars.length} carros encontrados</h2>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="name">Nome A-Z</option>
              </select>
            </div>

            <div className="grid gap-6">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  days={days}
                  searchParams={{
                    pickup: pickupLocation,
                    dropoff: dropoffLocation,
                    pickupDate,
                    dropoffDate,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
