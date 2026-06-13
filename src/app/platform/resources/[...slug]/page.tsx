"use client";

import dynamic from 'next/dynamic';

const CarbonSyncResourcesPage = dynamic(() => import('@/components/CarbonSyncResourcesPage'), { ssr: false });

export default function ResourcesDynamicPage() {
  return <CarbonSyncResourcesPage />;
}
