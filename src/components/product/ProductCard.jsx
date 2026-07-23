import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLikes } from '../../context/LikesContext';
import { Eye, ShoppingCart, Heart } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleLike, isLiked } = useLikes();
  const navigate = useNavigate();
  
  const liked = isLiked(product.id);

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    toggleLike(product);
  };

  return (
    <article className="product-card animate-fade-in" onClick={() => navigate(`/products/${product.id}`)}>
      <div className="product-card-image-wrapper">
        <img className="product-image" src={product.image} alt={product.title} loading="lazy" />
        <span className="product-card-category">{product.category}</span>
        
        <button 
          className={`heart-toggle-btn ${liked ? 'liked' : ''}`}
          onClick={handleLikeToggle}
          title={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          data-tooltip={liked ? 'Remove from Wishlist' : 'Add to Wishlist'}
          type="button"
        >
          <Heart 
            size={18} 
            fill={liked ? '#ef4444' : 'none'} 
            color="currentColor" 
            strokeWidth={2.5}
          />
        </button>
      </div>
      
      <div className="product-card-content">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-desc">{product.description}</p>
        
        <div className="product-card-footer">
          <span className="product-card-price">₹{product.price}</span>
          <div className="card-actions" onClick={(e) => e.stopPropagation()}>
            <button 
              className="icon-btn-secondary" 
              onClick={() => navigate(`/products/${product.id}`)} 
              title="View Details"
              type="button"
            >
              <Eye size={16} />
            </button>
            <button 
              className="icon-btn-primary" 
              onClick={() => addToCart(product)} 
              title="Add to Cart"
              type="button"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
