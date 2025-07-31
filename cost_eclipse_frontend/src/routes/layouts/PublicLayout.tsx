import { FinalCTASection } from '@/components/layouts/public_layouts/FinalCTASection';
import { Footer } from '@/components/layouts/public_layouts/Footer';
import { Header } from '@/components/layouts/public_layouts/Header';
// import { SUPERADMIN_DASHBOARD } from '@/constants/app_urls';
// import { localGet } from '@/utils/storage';
import { 
  // Navigate, 
  Outlet
 } from 'react-router-dom';

export default function PublicLayout() {
  // const token = localGet('token');
  // if (token) return <Navigate to={SUPERADMIN_DASHBOARD} />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Outlet />

        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
