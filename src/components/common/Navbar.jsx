import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLikes } from '../../context/LikesContext';
import { isAdminLoggedIn, logoutAdmin } from '../../utils/auth';
import { ShoppingCart, Heart, LayoutDashboard, Shield, LogOut } from 'lucide-react';

export default function Navbar() {
  const { itemCount } = useCart();
  const { likedProducts } = useLikes();
  const adminLoggedIn = isAdminLoggedIn();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <nav className="top-nav">
      <div className="nav-container">
        <div className="brand" onClick={() => navigate('/')}>
          <span className="brand-primary">Nexus</span>
          <span className="brand-secondary">Store</span>
        </div>

        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Products
          </NavLink>
          
          <NavLink to="/cart" className={({ isActive }) => `nav-link cart-link ${isActive ? 'active' : ''}`}>
            <ShoppingCart size={18} />
            <span>Cart</span>
            {itemCount > 0 && <span className="cart-badge animate-bounce">{itemCount}</span>}
          </NavLink>

          <NavLink to="/products?filter=favorites" className="nav-link wishlist-link">
            <Heart size={18} className="wishlist-icon-nav" />
            <span>Favorites</span>
            {likedProducts.length > 0 && <span className="wishlist-badge">{likedProducts.length}</span>}
          </NavLink>
          
          {adminLoggedIn ? (
            <>
              <NavLink to="/admin" className="nav-link admin-btn">
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </NavLink>
              <button className="logout-nav-btn" onClick={handleLogout} type="button">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <NavLink to="/admin/login" className={({ isActive }) => `nav-link admin-login-btn ${isActive ? 'active' : ''}`}>
              <Shield size={16} />
              <span>Admin</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
