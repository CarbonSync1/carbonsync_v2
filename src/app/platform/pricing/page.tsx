"use client";

import dynamic from 'next/dynamic';

const CarbonSynqEarthPricingPage = dynamic(() => import('@/components/CarbonSynqEarthPricingPage'), { ssr: false });

export default function PricingPage() {
  return <CarbonSynqEarthPricingPage />;
}
