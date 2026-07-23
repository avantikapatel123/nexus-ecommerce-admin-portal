import { useNavigate } from 'react-router-dom';
import CartList from '../../components/cart/CartList';
import CartSummary from '../../components/cart/CartSummary';
import { useCart } from '../../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <section className="cart-page-section">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        <p className="subtitle">Review your items and complete your purchase</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-state animate-fade-in">
          <div className="empty-icon-wrapper">
            <ShoppingBag size={48} />
          </div>
          <h3>Your cart is empty</h3>
          <p>Explore our premium collections and add some items to get started.</p>
          <button className="primary-btn" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-container">
            <CartList items={cart} />
          </div>
          <CartSummary />
        </div>
      )}
    </section>
  );
}
