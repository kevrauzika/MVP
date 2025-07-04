"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function SearchForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<{
    pickup: string;
    dropoff: string;
    pickupDate?: Date;
    pickupTime: string;
    dropoffDate?: Date;
    dropoffTime: string;
    differentDropoff: boolean;
  }>({
    pickup: "",
    dropoff: "",
    pickupDate: undefined,
    pickupTime: "10:00",
    dropoffDate: undefined,
    dropoffTime: "10:00",
    differentDropoff: false,
  });
  
  // Estados para controlar os popovers dos calendários
  const [pickupCalendarOpen, setPickupCalendarOpen] = useState(false);
  const [dropoffCalendarOpen, setDropoffCalendarOpen] = useState(false);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [suggestionsRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);

    if (!formData.pickupDate || !formData.dropoffDate) {
      alert("Por favor, selecione as datas de retirada e devolução.");
      return;
    }

    const params = new URLSearchParams({
      pickup: formData.pickup,
      dropoff: formData.differentDropoff ? formData.dropoff : formData.pickup,
      pickupDate: formData.pickupDate.toISOString(),
      pickupTime: formData.pickupTime,
      dropoffDate: formData.dropoffDate.toISOString(),
      dropoffTime: formData.dropoffTime,
    });

    router.push(`/categorias?${params.toString()}`);
  }

  const handleInputChange = async (field: string, value: any) => {
    setFormData((prev) => ({...prev, [field]: value }));

    if (field === "pickupDate" && value instanceof Date && formData.dropoffDate && value > formData.dropoffDate) {
      setFormData(prev => ({...prev, dropoffDate: undefined}));
    }

    if (field === 'pickup' && typeof value === 'string' && value.length > 1) {
      setIsFetchingSuggestions(true);
      try {
        const response = await fetch(`/api/suggestions?q=${value}`);
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
      } finally {
        setIsFetchingSuggestions(false);
      }
    } else if (field === 'pickup' && typeof value === 'string' && value.length <= 1) {
      setShowSuggestions(false);
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setFormData(prev => ({ ...prev, pickup: suggestion }));
    setShowSuggestions(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative" ref={suggestionsRef}>
          <label className="block text-sm font-semibold text-gray-700 mb-2"><MapPin className="w-4 h-4 inline mr-1" />Local de Retirada</label>
          <input type="text" value={formData.pickup} onChange={(e) => handleInputChange("pickup", e.target.value)} onFocus={() => formData.pickup.length > 1 && setShowSuggestions(true)} placeholder="Digite a cidade ou aeroporto" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring" required autoComplete="off" />
          {showSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {isFetchingSuggestions ? <div className="px-4 py-2 text-gray-500">Buscando...</div> : suggestions.length > 0 ? (
                <ul>{suggestions.map((suggestion, index) => <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="px-4 py-2 text-gray-700 hover:bg-orange-100 cursor-pointer">{suggestion}</li>)}</ul>
              ) : <div className="px-4 py-2 text-gray-500">Nenhum local encontrado.</div>}
            </div>
          )}
        </div>

        <div className="flex items-center"><input type="checkbox" id="differentDropoff" checked={formData.differentDropoff} onChange={(e) => handleInputChange("differentDropoff", e.target.checked)} className="w-4 h-4 text-primary rounded focus:ring-primary" /><label htmlFor="differentDropoff" className="ml-2 text-sm text-gray-700">Devolver em local diferente</label></div>
        {formData.differentDropoff && (
          <div><label className="block text-sm font-semibold text-gray-700 mb-2"><MapPin className="w-4 h-4 inline mr-1" />Local de Devolução</label><input type="text" value={formData.dropoff} onChange={(e) => handleInputChange("dropoff", e.target.value)} placeholder="Digite a cidade, aeroporto ou endereço" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring" required /></div>
        )}
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2"><CalendarIcon className="w-4 h-4 inline mr-1" />Data de Retirada</label>
            <Popover open={pickupCalendarOpen} onOpenChange={setPickupCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal h-12", !formData.pickupDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.pickupDate ? format(formData.pickupDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>Selecione a data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={formData.pickupDate} onSelect={(date) => {handleInputChange("pickupDate", date); setPickupCalendarOpen(false);}} disabled={{ before: new Date() }} initialFocus locale={ptBR} />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2"><Clock className="w-4 h-4 inline mr-1" />Hora de Retirada</label>
            <select value={formData.pickupTime} onChange={(e) => handleInputChange("pickupTime", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring h-12">
              {Array.from({ length: 24 }, (_, i) => (<option key={i} value={`${i.toString().padStart(2, '0')}:00`}>{`${i.toString().padStart(2, '0')}:00`}</option>))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2"><CalendarIcon className="w-4 h-4 inline mr-1" />Data de Devolução</label>
            <Popover open={dropoffCalendarOpen} onOpenChange={setDropoffCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant={"outline"} disabled={!formData.pickupDate} className={cn("w-full justify-start text-left font-normal h-12", !formData.dropoffDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dropoffDate ? format(formData.dropoffDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>Selecione a data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={formData.dropoffDate} onSelect={(date) => {handleInputChange("dropoffDate", date); setDropoffCalendarOpen(false);}} disabled={{ before: formData.pickupDate || new Date() }} initialFocus locale={ptBR} />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2"><Clock className="w-4 h-4 inline mr-1" />Hora de Devolução</label>
            <select value={formData.dropoffTime} onChange={(e) => handleInputChange("dropoffTime", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring h-12">
              {Array.from({ length: 24 }, (_, i) => (<option key={i} value={`${i.toString().padStart(2, '0')}:00`}>{`${i.toString().padStart(2, '0')}:00`}</option>))}
            </select>
          </div>
        </div>
        
        <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-bold text-lg rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg">
          Selecionar Categoria
        </button>
      </form>
    </div>
  );
}