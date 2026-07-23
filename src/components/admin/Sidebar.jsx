import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminProfile } from '../../context/AdminProfileContext';
import { isAdminLoggedIn, logoutAdmin } from '../../utils/auth';
import { LayoutDashboard, Boxes, PlusCircle, LogOut, ArrowLeft } from 'lucide-react';

export default function Sidebar() {
  const { avatar, name } = useAdminProfile();
  const adminLoggedIn = isAdminLoggedIn();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-profile-dp">
          <img src={avatar} alt="Admin Avatar" className="sidebar-avatar-img" />
        </div>
        <div className="brand-details">
          <span className="brand-name text-truncate-sidebar">{name}</span>
          <span className="brand-status">System Admin</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink 
          to="/admin" 
          end 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/admin/products" 
          end
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Boxes size={18} />
          <span>Products</span>
        </NavLink>

        <NavLink 
          to="/admin/products/add" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <PlusCircle size={18} />
          <span>Add Product</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-footer-btn return-btn" onClick={() => navigate('/')} type="button">
          <ArrowLeft size={16} />
          <span>Storefront</span>
        </button>

        {adminLoggedIn && (
          <button className="sidebar-footer-btn logout-btn" onClick={handleLogout} type="button">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}
