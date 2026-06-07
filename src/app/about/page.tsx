import dynamic from 'next/dynamic';
import Hero from '@/components/about-us/Hero';
import About from '@/components/about-us/About';

const Innovation = dynamic(() => import('@/components/about-us/Innovation'));
const Offerings = dynamic(() => import('@/components/about-us/Offerings'));
const Team = dynamic(() => import('@/components/about-us/Team'));
const Newsroom = dynamic(() => import('@/components/about-us/Newsroom'));
const Logos = dynamic(() => import('@/components/about-us/Logos'));
const Timeline = dynamic(() => import('@/components/about-us/Timeline'));
const Mentors = dynamic(() => import('@/components/about-us/Mentors'));
const CallToAction = dynamic(() => import('@/components/about-us/CallToAction'));
const Experience = dynamic(() => import('@/components/about-us/Experience'));

import '@/components/about-us/about-styles.css';

export default function AboutPage() {
  return (
    <>
      <Hero />
      <About />
      <Innovation />
      <Offerings />
      <Team />
      <Newsroom />
      <Logos />
      <Timeline />
      <Mentors />
      <CallToAction />
      <Experience />
    </>
  );
}
