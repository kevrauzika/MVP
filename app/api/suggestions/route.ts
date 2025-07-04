// app/api/suggestions/route.ts

import { NextResponse } from 'next/server';

// Tipagem para os dados que vêm do IBGE
interface IBGECity {
  id: number;
  nome: string;
}

interface IBGEState {
  id: number;
  sigla: string;
  nome: string;
}

// --- Cache Simples em Memória ---
let citiesCache: string[] = [];

// Função para remover acentos e converter para minúsculas
const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD") // Decompõe os caracteres acentuados (ex: 'á' -> 'a' + '´')
    .replace(/[\u0300-\u036f]/g, ""); // Remove os acentos
};

async function fetchAndCacheCities() {
  if (citiesCache.length > 0) {
    return;
  }

  console.log("Buscando e cacheando cidades do IBGE...");
  try {
    const statesResponse = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
    if (!statesResponse.ok) throw new Error('Falha ao buscar estados');
    const states: IBGEState[] = await statesResponse.json();

    const allCitiesPromises = states.map(async (state) => {
      const citiesResponse = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.sigla}/municipios`);
      if (!citiesResponse.ok) return [];
      const cities: IBGECity[] = await citiesResponse.json();
      return cities.map(city => `${city.nome}, ${state.sigla}`);
    });

    const citiesByState = await Promise.all(allCitiesPromises);
    citiesCache = citiesByState.flat();
    console.log(`Cache criado com ${citiesCache.length} cidades.`);
  } catch (error) {
    console.error("Erro ao criar cache de cidades:", error);
    citiesCache = [];
  }
}

// Inicia o cache
fetchAndCacheCities();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  // Normaliza o termo da busca
  const normalizedQuery = normalizeString(query);

  if (citiesCache.length === 0) {
    await fetchAndCacheCities();
  }

  const filteredCities = citiesCache
    // Normaliza cada cidade do cache antes de comparar
    .filter(city => normalizeString(city).includes(normalizedQuery))
    .slice(0, 8); 

  return NextResponse.json(filteredCities);
}