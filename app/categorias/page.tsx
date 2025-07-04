"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'

// Dados das categorias com mais exemplos e imagens diferentes
const categories = [
  { name: 'Hatch', description: 'Versatilidade e economia para o seu dia a dia.', imageUrl: '/placeholder.svg?text=Hatch&height=200&width=300' },
  { name: 'Sedan', description: 'Conforto e espaço para toda a família.', imageUrl: '/placeholder.svg?text=Sedan&height=200&width=300' },
  { name: 'SUV', description: 'Aventura e robustez para qualquer terreno.', imageUrl: '/placeholder.svg?text=SUV&height=200&width=300' },
  { name: 'Executivo', description: 'Luxo e performance para viagens de negócios.', imageUrl: '/placeholder.svg?text=Executivo&height=200&width=300' },
  { name: 'Minivan', description: 'Espaço de sobra para grandes grupos e bagagens.', imageUrl: '/placeholder.svg?text=Minivan&height=200&width=300' },
  { name: 'Esportivo', description: 'Emoção e design para quem ama dirigir.', imageUrl: '/placeholder.svg?text=Esportivo&height=200&width=300' },
]

function CategorySelector() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCategoryClick = (categoryName: string) => {
        // Cria novos parâmetros de busca, mantendo os antigos e adicionando a categoria
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('category', categoryName);
        
        router.push(`/resultados?${newParams.toString()}`);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Escolha uma categoria</h1>
                    <p className="text-lg text-gray-600">Selecione o tipo de carro que melhor se adapta à sua viagem.</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <div 
                            key={category.name}
                            onClick={() => handleCategoryClick(category.name)}
                            className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer transform hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="relative h-48 bg-gray-200">
                                <Image
                                    src={category.imageUrl}
                                    alt={category.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">{category.name}</h3>
                                <p className="text-gray-600 text-sm">{category.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Componente principal que usa Suspense para garantir que os searchParams estejam disponíveis
export default function CategoriesPage() {
    return (
        <Suspense fallback={<div className="text-center p-10">Carregando categorias...</div>}>
            <CategorySelector />
        </Suspense>
    )
}