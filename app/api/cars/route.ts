// app/api/cars/route.ts
import { NextResponse } from "next/server";
import { cars } from "@/lib/data";

export async function GET() {
  // No futuro, aqui você faria a busca no seu banco de dados.
  // Por agora, estamos retornando os dados mockados.
  return NextResponse.json(cars);
}