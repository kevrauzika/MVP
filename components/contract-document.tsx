// components/contract-document.tsx
import React from 'react';
import type { Car } from '@/types/car';
import { format, parseISO } from 'date-fns';

interface ContractProps {
  reservationNumber: string;
  car: Car;
  driverName: string;
  driverCpf: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  totalPrice: string;
}

// Estilos inline para garantir a formatação no PDF
const styles = {
  page: { fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#333', width: '210mm', height: '297mm', padding: '15mm' },
  header: { textAlign: 'center' as const, borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' },
  h1: { fontSize: '24px', margin: '0 0 10px 0', color: '#000' },
  h2: { fontSize: '18px', margin: '20px 0 10px 0', borderBottom: '1px solid #eee', paddingBottom: '5px' },
  section: { marginBottom: '20px' },
  flex: { display: 'flex', justifyContent: 'space-between' as const, marginBottom: '8px' },
  strong: { fontWeight: 'bold' as const },
  signature: { marginTop: '80px', borderTop: '1px solid #333', paddingTop: '10px', width: '60%', textAlign: 'center' as const },
  carImage: { maxWidth: '300px', borderRadius: '8px', margin: '10px 0' },
  vistoriaBox: { border: '1px solid #ccc', padding: '10px', marginTop: '10px' },
  checklistItem: { marginBottom: '5px' }
};

const formatDate = (dateString: string | null) => dateString ? format(parseISO(dateString), "dd/MM/yyyy") : 'N/A';

export const ContractDocument = React.forwardRef<HTMLDivElement, ContractProps>((props, ref) => {
  return (
    <div ref={ref} style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.h1}>Celsinho Car Rental</h1>
        <p>Contrato de Locação de Veículo</p>
      </header>

      <section style={styles.section}>
        <div style={styles.flex}>
          <span>Número da Reserva: <span style={styles.strong}>{props.reservationNumber}</span></span>
          <span>Data de Emissão: <span style={styles.strong}>{format(new Date(), "dd/MM/yyyy")}</span></span>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>1. Dados do Locatário</h2>
        <p><strong>Nome:</strong> {props.driverName}</p>
        <p><strong>CPF:</strong> {props.driverCpf}</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>2. Detalhes da Locação</h2>
        <p><strong>Retirada:</strong> {props.pickupLocation} em {formatDate(props.pickupDate)}</p>
        <p><strong>Devolução:</strong> {props.dropoffLocation} em {formatDate(props.dropoffDate)}</p>
        <p><strong>Valor Total da Reserva:</strong> <span style={styles.strong}>{props.totalPrice}</span></p>
      </section>
      
      <section style={styles.section}>
        <h2 style={styles.h2}>3. Veículo</h2>
        <p><strong>Modelo:</strong> {props.car.name} ({props.car.category})</p>
        <p><strong>Transmissão:</strong> {props.car.transmission}</p>
        <p><strong>Placa:</strong> (a ser preenchido na retirada)</p>
        {/* Usamos a URL da imagem diretamente */}
        <img src={props.car.image} alt={props.car.name} style={styles.carImage} />
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>4. Vistoria do Veículo (Checklist de Retirada)</h2>
        <div style={styles.vistoriaBox}>
            <p>A ser preenchido no balcão no momento da retirada.</p>
            <div style={styles.checklistItem}>[  ] Lataria (sem avarias)</div>
            <div style={styles.checklistItem}>[  ] Pneus e Calotas (sem avarias)</div>
            <div style={styles.checklistItem}>[  ] Vidros e Faróis (sem trincas)</div>
            <div style={styles.checklistItem}>[  ] Interior e Estofados (limpo e sem furos)</div>
            <div style={styles.checklistItem}>[  ] Nível de Combustível: ____ / ____</div>
            <p><strong>Observações:</strong> ____________________________________________________________________</p>
        </div>
      </section>
      
      <section style={styles.section}>
        <h2 style={styles.h2}>5. Assinatura</h2>
        <p>Declaro que li e concordo com os termos e condições gerais de locação da Celsinho Car Rental e que as informações de vistoria acima estão corretas.</p>
        <div style={{...styles.signature, marginLeft: 'auto', marginRight: 'auto'}}>
            <p>{props.driverName}</p>
        </div>
      </section>
    </div>
  );
});

ContractDocument.displayName = 'ContractDocument';