import { useCart } from '../../context/CartContext';
import { CreditCard, Trash2, ArrowRight } from 'lucide-react';

export default function CartSummary() {
  const { totalPrice, clearCart } = useCart();
  const tax = Math.round(totalPrice * 0.18); // 18% mock tax
  const shipping = totalPrice > 500 ? 0 : 50;
  const grandTotal = totalPrice + tax + shipping;

  const handleCheckout = () => {
    alert('Thank you for your order! Checkout mock successful.');
  };

  return (
    <div className="cart-summary-card animate-fade-in">
      <h3>Order Summary</h3>
      
      <div className="summary-details">
        <div className="summary-row">
          <span className="label">Subtotal</span>
          <span className="value">₹{totalPrice}</span>
        </div>
        <div className="summary-row">
          <span className="label">Est. GST (18%)</span>
          <span className="value">₹{tax}</span>
        </div>
        <div className="summary-row">
          <span className="label">Shipping</span>
          <span className="value">{shipping === 0 ? <span className="free-shipping">FREE</span> : `₹${shipping}`}</span>
        </div>
        
        <div className="summary-divider"></div>
        
        <div className="summary-row grand-total">
          <span className="label">Total Amount</span>
          <span className="value">₹{grandTotal}</span>
        </div>
      </div>

      <div className="summary-actions">
        <button className="primary-btn checkout-btn" onClick={handleCheckout} type="button">
          <CreditCard size={16} /> Checkout <ArrowRight size={16} />
        </button>
        <button className="clear-cart-btn" onClick={clearCart} type="button">
          <Trash2 size={16} /> Clear Cart
        </button>
      </div>
    </div>
  );
}
