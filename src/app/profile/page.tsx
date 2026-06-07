import dynamic from 'next/dynamic';

const ProfilePage = dynamic(() => import('@/components/profile/ProfilePage'));

import '@/components/profile/profile-styles.css';

export default function UserProfilePage() {
  return <ProfilePage />;
}
