import dynamic from 'next/dynamic';

const CarbonSyncResourcesPage = dynamic(() => import('@/components/CarbonSyncResourcesPage'));

export default function ResourcesPage() {
  return <CarbonSyncResourcesPage />;
}
