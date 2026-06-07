import dynamic from 'next/dynamic';

const CarbonSyncPricingPage = dynamic(() => import('@/components/CarbonSyncPricingPage'));

export default function PricingPage() {
  return <CarbonSyncPricingPage />;
}
