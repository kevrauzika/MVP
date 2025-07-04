import { NextResponse } from "next/server";
import { cars } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const carId = params.id;
  const car = cars.find((c) => c.id === carId);

  if (car) {
    return NextResponse.json(car);
  }

  return new NextResponse(JSON.stringify({ message: `Carro com ID ${carId} não encontrado.` }), {
    status: 404,
    headers: {
      "Content-Type": "application/json",
    },
  });
}