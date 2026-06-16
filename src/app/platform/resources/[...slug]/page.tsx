"use client";

import dynamic from 'next/dynamic';

const CarbonSynqEarthResourcesPage = dynamic(() => import('@/components/CarbonSynqEarthResourcesPage'), { ssr: false });

export default function ResourcesDynamicPage() {
  return <CarbonSynqEarthResourcesPage />;
}
