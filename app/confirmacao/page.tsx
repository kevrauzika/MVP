"use client"

import { useSearchParams } from "next/navigation"
import { CheckCircle, Calendar, MapPin, Car, Printer } from "lucide-react"
import Link from "next/link"
import React, { useRef } from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

import { cars as mockCars } from "@/lib/data"
import { ContractDocument } from "@/components/contract-document" // Importa o nosso contrato

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const contractRef = useRef<HTMLDivElement>(null)

  const reservationNumber = searchParams.get("reservationNumber") || ""
  const carId = searchParams.get("carId") || ""
  const pickup = searchParams.get("pickup") || ""
  const dropoff = searchParams.get("dropoff") || ""
  const pickupDate = searchParams.get("pickupDate") || ""
  const dropoffDate = searchParams.get("dropoffDate") || ""
  const totalPrice = searchParams.get("totalPrice") || "0"
  const driverName = searchParams.get("driverName") || ""
  const driverEmail = searchParams.get("driverEmail") || ""
  // Supondo que você também passe o CPF pela URL ou o busque de outro lugar
  const driverCpf = searchParams.get("driverCPF") || "000.000.000-00";

  const car = mockCars.find((c) => c.id === carId)

  const formatDate = (dateString: string) => dateString ? new Date(dateString).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) : ""
  const formatPrice = (price: string) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(price))

  const handleGeneratePdf = () => {
    const input = contractRef.current;
    if (input) {
      html2canvas(input, { scale: 2 }) // A escala melhora a qualidade da imagem
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          // Orietação 'p' (portrait/retrato), unidade 'mm' (milímetros), formato 'a4'
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          const ratio = canvasWidth / canvasHeight;
          const width = pdfWidth;
          const height = width / ratio;

          // Se a altura do conteúdo for maior que a página, dividimos em várias páginas
          let position = 0;
          if (height > pdfHeight) {
            let remainingHeight = height;
            while (remainingHeight > 0) {
              pdf.addImage(imgData, 'PNG', 0, position, width, height);
              remainingHeight -= pdfHeight;
              if (remainingHeight > 0) {
                pdf.addPage();
                position = -pdfHeight; 
              }
            }
          } else {
             pdf.addImage(imgData, 'PNG', 0, 0, width, height);
          }

          pdf.save(`contrato-reserva-${reservationNumber}.pdf`);
        });
    }
  };

  if (!car) {
    return <div>Carregando dados da reserva...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header de Sucesso */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Reserva Confirmada!</h1>
            <p className="text-lg text-gray-600">Um e-mail de confirmação foi enviado para {driverEmail}.</p>
          </div>

          {/* ... (resto da página de confirmação permanece igual) ... */}
          
          {/* Botões de Ação ATUALIZADOS */}
          <div className="text-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleGeneratePdf}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all inline-flex items-center gap-2"
            >
              <Printer className="w-4 h-4"/>
              Gerar Contrato em PDF
            </button>
            <Link
              href="/"
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all inline-block"
            >
              Nova Reserva
            </Link>
          </div>
        </div>
      </div>
      
      {/* O componente do contrato fica aqui, mas escondido, para ser usado na geração do PDF */}
      <div style={{ position: 'absolute', left: '-20000px', top: 0 }}>
        <ContractDocument 
            ref={contractRef}
            reservationNumber={reservationNumber}
            car={car}
            driverName={driverName}
            driverCpf={driverCpf}
            pickupLocation={pickup}
            dropoffLocation={dropoff}
            pickupDate={pickupDate}
            dropoffDate={dropoffDate}
            totalPrice={formatPrice(totalPrice)}
        />
      </div>
    </div>
  )
}