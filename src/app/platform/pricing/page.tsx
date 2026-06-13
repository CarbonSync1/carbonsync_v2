"use client";

import dynamic from 'next/dynamic';

const CarbonSyncPricingPage = dynamic(() => import('@/components/CarbonSyncPricingPage'), { ssr: false });

export default function PricingPage() {
  return <CarbonSyncPricingPage />;
}
