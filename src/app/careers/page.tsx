import dynamic from 'next/dynamic';

const CareerPage = dynamic(() => import('@/components/CareerPage'));

export default function CareersPage() {
  return <CareerPage />;
}
