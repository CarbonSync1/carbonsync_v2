"use client";

import dynamic from 'next/dynamic';

const CarbonSynqPricingPage = dynamic(() => import('@/components/CarbonSynqPricingPage'), { ssr: false });

export default function PricingPage() {
  return <CarbonSynqPricingPage />;
}
