"use client";

import dynamic from 'next/dynamic';

const CarbonSynqResourcesPage = dynamic(() => import('@/components/CarbonSynqResourcesPage'), { ssr: false });

export default function ResourcesPage() {
  return <CarbonSynqResourcesPage />;
}
