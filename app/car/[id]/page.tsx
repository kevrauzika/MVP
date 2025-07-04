"use client"

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import type { Car } from '@/types/car';
import Image from 'next/image';
import { Users, Luggage, Settings, Snowflake, ArrowLeft, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';

function CarDetails() {
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams(); // Hook para ler parâmetros da URL
    const { id } = params;

    // Extrai os parâmetros da busca que vieram da URL
    const pickupLocation = searchParams.get("pickup");
    const dropoffLocation = searchParams.get("dropoff");
    const pickupDate = searchParams.get("pickupDate");
    const dropoffDate = searchParams.get("dropoffDate");

    // Monta a URL para o checkout com todos os dados
    const checkoutUrl = `/checkout?${searchParams.toString()}`;

    useEffect(() => {
        if (id) {
            const fetchCarDetails = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`/api/cars/${id}`);
                    if (!response.ok) throw new Error('Carro não encontrado');
                    const data = await response.json();
                    setCar(data);
                } catch (error) {
                    console.error("Falha ao buscar detalhes do carro:", error);
                    setCar(null);
                } finally {
                    setLoading(false);
                }
            };
            fetchCarDetails();
        }
    }, [id]);

    const formatPrice = (price: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);
    const formatDate = (dateString: string | null) => dateString ? format(parseISO(dateString), "dd/MM/yyyy") : 'N/A';

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen bg-gray-50"><p>Carregando...</p></div>;
    }

    if (!car) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
                <h1 className="text-2xl font-bold mb-4">Carro não encontrado</h1>
                <Button onClick={() => router.push('/')}>Voltar ao início</Button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <Button variant="ghost" onClick={() => router.back()} className="mb-6"><ArrowLeft className="w-4 h-4 mr-2" />Voltar</Button>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="relative h-64 md:h-full min-h-[400px]">
                            <Image src={car.image || "/placeholder.svg"} alt={car.name} layout="fill" objectFit="cover" priority />
                        </div>
                        <div className="p-8 flex flex-col">
                            <span className="px-3 py-1 bg-orange-100 text-primary font-semibold text-sm rounded-full self-start mb-4">{car.category}</span>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">{car.name}</h1>
                            
                            {/* Resumo da reserva */}
                            {pickupLocation && (
                                <div className='text-sm text-gray-600 bg-gray-50 p-4 rounded-lg mb-6'>
                                    <p className='flex items-center gap-2 mb-1'><MapPin size={16} className='text-primary'/> <strong>Retirada:</strong> {pickupLocation} em {formatDate(pickupDate)}</p>
                                    <p className='flex items-center gap-2'><MapPin size={16} className='text-primary'/> <strong>Devolução:</strong> {dropoffLocation} em {formatDate(dropoffDate)}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-gray-600 mb-8">
                                <div className="flex items-center gap-2"><Users className="text-primary"/> {car.passengers} passageiros</div>
                                <div className="flex items-center gap-2"><Luggage className="text-primary"/> {car.luggage} bagagens</div>
                                <div className="flex items-center gap-2"><Settings className="text-primary"/> {car.transmission}</div>
                                {car.airConditioning && <div className="flex items-center gap-2"><Snowflake className="text-primary"/> Ar condicionado</div>}
                            </div>
                            
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recursos inclusos</h3>
                            <ul className="space-y-2">
                                {car.features.map(feature => <li key={feature} className="flex items-center text-gray-600"><div className="w-2 h-2 bg-primary rounded-full mr-3"></div>{feature}</li>)}
                            </ul>

                            <div className="mt-auto pt-8 text-right">
                                <p className="text-gray-500 text-sm">Diária a partir de</p>
                                <p className="text-5xl font-bold text-primary">{formatPrice(car.pricePerDay)}</p>
                                {/* ALTERAÇÃO: O botão agora usa a URL de checkout com todos os dados */}
                                <Link href={checkoutUrl} className="mt-4 inline-block w-full py-4 bg-primary text-primary-foreground text-center font-bold text-lg rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg">
                                    Reservar Agora
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Componente principal que usa Suspense para garantir o acesso aos searchParams
export default function CarDetailsPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><p>Carregando...</p></div>}>
            <CarDetails />
        </Suspense>
    )
}