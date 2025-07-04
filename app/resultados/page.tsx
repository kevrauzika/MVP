"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { format, parseISO } from "date-fns"
import CarCard from "@/components/car-card"
import FilterSidebar from "@/components/filter-sidebar"
import type { Car } from "@/types/car"

function ResultsDisplay() {
  const searchParams = useSearchParams()
  const [allCars, setAllCars] = useState<Car[]>([]) // Guarda todos os carros da API
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [sortBy, setSortBy] = useState("price-asc")
  const [loading, setLoading] = useState(true)

  const pickupLocation = searchParams.get("pickup") || "N/A"
  const dropoffLocation = searchParams.get("dropoff") || "N/A"
  const pickupDateISO = searchParams.get("pickupDate") || ""
  const dropoffDateISO = searchParams.get("dropoffDate") || ""
  const initialCategory = searchParams.get("category") || "all" // Pega a categoria da URL

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        const data: Car[] = await response.json();
        setAllCars(data);

        // ALTERAÇÃO: Filtra inicialmente pela categoria vinda da URL
        let initialFilteredData = data;
        if (initialCategory && initialCategory !== "all") {
            initialFilteredData = data.filter(car => car.category === initialCategory);
        }

        // Ordena os dados filtrados
        const sortedData = [...initialFilteredData].sort((a, b) => a.pricePerDay - b.pricePerDay);
        setFilteredCars(sortedData);

      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [initialCategory]); // Re-executa se a categoria mudar (embora não vá mudar nesta página)

  const calculateDays = () => {
    if (pickupDateISO && dropoffDateISO) {
      const start = parseISO(pickupDateISO);
      const end = parseISO(dropoffDateISO);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays === 0 ? 1 : diffDays;
    }
    return 1;
  };

  const days = calculateDays();
  const formattedPickupDate = pickupDateISO ? format(parseISO(pickupDateISO), "dd/MM/yyyy") : "";
  const formattedDropoffDate = dropoffDateISO ? format(parseISO(dropoffDateISO), "dd/MM/yyyy") : "";

  const handleSort = (value: string) => {
    setSortBy(value);
    const sorted = [...filteredCars].sort((a, b) => {
      switch (value) {
        case "price-asc": return a.pricePerDay - b.pricePerDay;
        case "price-desc": return b.pricePerDay - a.pricePerDay;
        case "name": return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
    setFilteredCars(sorted);
  };

  // A função de filtro agora usa a lista completa de `allCars` como base
  const handleFilter = (filters: any) => {
    let tempFiltered = [...allCars];

    // O filtro da sidebar agora pode sobrescrever a categoria inicial
    const currentCategory = filters.category || initialCategory;
    if (currentCategory && currentCategory !== "all") {
      tempFiltered = tempFiltered.filter((car) => car.category === currentCategory);
    }
    if (filters.transmission && filters.transmission !== "all") {
      tempFiltered = tempFiltered.filter((car) => car.transmission === filters.transmission);
    }
    if (filters.minPrice || filters.maxPrice) {
      tempFiltered = tempFiltered.filter((car) => {
        const price = car.pricePerDay;
        return (!filters.minPrice || price >= Number(filters.minPrice)) && (!filters.maxPrice || price <= Number(filters.maxPrice));
      });
    }
    
    // Re-aplica a ordenação atual
    const sorted = [...tempFiltered].sort((a, b) => {
        switch (sortBy) {
          case "price-asc": return a.pricePerDay - b.pricePerDay;
          case "price-desc": return b.pricePerDay - a.pricePerDay;
          case "name": return a.name.localeCompare(b.name);
          default: return 0;
        }
    });

    setFilteredCars(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-700">
            <span><strong>Retirada:</strong> {pickupLocation}</span>
            <span><strong>Devolução:</strong> {dropoffLocation}</span>
            <span><strong>Período:</strong> {formattedPickupDate} até {formattedDropoffDate}</span>
            <span className="font-bold text-orange-600">{days} {days === 1 ? 'diária' : 'diárias'}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div>Carregando carros...</div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
                {/* Passa a categoria inicial para o sidebar para que ele comece com o valor certo */}
              <FilterSidebar onFilter={handleFilter} initialCategory={initialCategory} />
            </div>
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{filteredCars.length} carros encontrados</h2>
                <select value={sortBy} onChange={(e) => handleSort(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                  <option value="name">Nome A-Z</option>
                </select>
              </div>
              <div className="grid gap-6">
                {filteredCars.length > 0 ? (
                  filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} days={days} searchParams={{ pickup: pickupLocation, dropoff: dropoffLocation, pickupDate: pickupDateISO, dropoffDate: dropoffDateISO }} />
                  ))
                ) : (
                  <div className="text-center py-10 bg-white rounded-lg shadow"><p className="text-gray-600">Nenhum carro encontrado.</p></div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<div className="text-center p-10">Carregando informações...</div>}>
            <ResultsDisplay />
        </Suspense>
    )
}