import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import '@/components/dashboard/dashboard-styles.css';

const DashboardApp = dynamic(() => import('@/components/DashboardApp'));

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <DashboardApp />
    </div>
  );
}
