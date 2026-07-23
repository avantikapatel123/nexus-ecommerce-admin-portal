import Sidebar from '../components/admin/Sidebar';
import AdminHeader from '../components/admin/AdminHeader';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="admin-portal-shell">
      <Sidebar />
      <div className="admin-main-container">
        <AdminHeader />
        <main className="admin-page-content animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
