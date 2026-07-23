import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-content animate-fade-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
