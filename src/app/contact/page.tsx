'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import ContactHero from '@/components/contact-us/ContactHero';
import Features from '@/components/contact-us/Features';
import FooterContact from '@/components/contact-us/FooterContact';

const LocationMap = dynamic(() => import('@/components/contact-us/LocationMap'), { ssr: false });

export default function CarbonSyncContact() {
  return (
    <>
      <ContactHero />
      <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />}>
        <LocationMap />
      </Suspense>
      <Features />
      <FooterContact />
    </>
  );
}
