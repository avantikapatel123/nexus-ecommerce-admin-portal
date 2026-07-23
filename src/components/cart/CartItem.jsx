import { useCart } from '../../context/CartContext';
import { Trash2, Minus, Plus } from 'lucide-react';

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cart-item animate-fade-in">
      <div className="cart-item-info">
        <img className="cart-item-thumb" src={item.image} alt={item.title} />
        <div className="cart-item-details">
          <h4>{item.title}</h4>
          <span className="cart-item-unit-price">₹{item.price} each</span>
        </div>
      </div>
      
      <div className="cart-item-actions">
        <div className="quantity-adjuster">
          <button 
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
            type="button"
          >
            <Minus size={14} />
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button 
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
            type="button"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="cart-item-price-section">
          <strong className="cart-item-subtotal">₹{item.price * item.quantity}</strong>
          <button 
            className="remove-cart-item-btn" 
            onClick={() => removeFromCart(item.id)} 
            title="Remove item"
            type="button"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
