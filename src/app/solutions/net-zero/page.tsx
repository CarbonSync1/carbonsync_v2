import dynamic from 'next/dynamic';

const NetZeroApp = dynamic(() => import('@/components/NetZeroApp'));

export default function NetZeroPage() {
  return <NetZeroApp />;
}
