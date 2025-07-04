// lib/data.ts
import type { Car } from "@/types/car";

export const cars: Car[] = [
  // Categoria Hatch
  {
    id: "1",
    name: "Chevrolet Onix",
    category: "Hatch",
    // FOTO ATUALIZADA AQUI
    image: "https://a.storyblok.com/f/241094/1280x720/3b464fbed1/polo-track.png",
    transmission: "Manual",
    passengers: 5,
    luggage: 2,
    airConditioning: true,
    pricePerDay: 89,
    features: ["Ar Condicionado", "Direção Hidráulica", "Vidros Elétricos"],
  },
  {
    id: "4",
    name: "Hyundai HB20",
    category: "Hatch",
    image: "https://placehold.co/300x200/f97316/ffffff?text=HB20",
    transmission: "Automático",
    passengers: 5,
    luggage: 2,
    airConditioning: true,
    pricePerDay: 99,
    features: ["Ar Condicionado", "Câmbio Automático", "Central Multimídia"],
  },

  // Categoria Sedan
  {
    id: "2",
    name: "Toyota Corolla",
    category: "Sedan",
    image: "https://placehold.co/300x200/1e293b/ffffff?text=Corolla",
    transmission: "Automático",
    passengers: 5,
    luggage: 4,
    airConditioning: true,
    pricePerDay: 145,
    features: ["Ar Condicionado", "Câmbio Automático", "GPS", "Bluetooth"],
  },
  {
    id: "5",
    name: "Honda Civic",
    category: "Sedan",
    image: "https://placehold.co/300x200/1e293b/ffffff?text=Civic",
    transmission: "Automático",
    passengers: 5,
    luggage: 4,
    airConditioning: true,
    pricePerDay: 155,
    features: ["Ar Condicionado", "Teto Solar", "Bancos de Couro", "Câmera de Ré"],
  },

  // Categoria SUV
  {
    id: "3",
    name: "Jeep Compass",
    category: "SUV",
    image: "https://placehold.co/300x200/4d7c0f/ffffff?text=Compass",
    transmission: "Automático",
    passengers: 5,
    luggage: 4,
    airConditioning: true,
    pricePerDay: 189,
    features: ["Ar Condicionado", "Câmbio Automático", "GPS", "4x4", "Teto Solar"],
  },
  {
    id: "6",
    name: "Hyundai Creta",
    category: "SUV",
    image: "https://placehold.co/300x200/4d7c0f/ffffff?text=Creta",
    transmission: "Automático",
    passengers: 5,
    luggage: 4,
    airConditioning: true,
    pricePerDay: 165,
    features: ["Ar Condicionado", "Central Multimídia", "Sensor de Estacionamento"],
  },

  // Categoria Executivo
  {
    id: "7",
    name: "BMW 320i",
    category: "Executivo",
    image: "https://placehold.co/300x200/1d4ed8/ffffff?text=BMW+320i",
    transmission: "Automático",
    passengers: 5,
    luggage: 3,
    airConditioning: true,
    pricePerDay: 350,
    features: ["Bancos de Couro", "Teto Solar", "GPS Integrado", "Modos de Condução"],
  },

  // Categoria Minivan
  {
    id: "8",
    name: "Chevrolet Spin",
    category: "Minivan",
    image: "https://placehold.co/300x200/6b21a8/ffffff?text=Spin",
    transmission: "Automático",
    passengers: 7,
    luggage: 5,
    airConditioning: true,
    pricePerDay: 195,
    features: ["7 Lugares", "Amplo Porta-malas", "Sensor de Estacionamento"],
  },

  // Categoria Esportivo
  {
    id: "9",
    name: "Ford Mustang",
    category: "Esportivo",
    image: "https://placehold.co/300x200/be123c/ffffff?text=Mustang",
    transmission: "Automático",
    passengers: 4,
    luggage: 2,
    airConditioning: true,
    pricePerDay: 450,
    features: ["Motor V8", "Controle de Largada", "Bancos Esportivos", "Sistema de Som Premium"],
  }
];