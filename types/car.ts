export interface Car {
  id: string
  name: string
  category: string
  image: string
  transmission: "Manual" | "Automático"
  passengers: number
  luggage: number
  airConditioning: boolean
  pricePerDay: number
  features: string[]
}
