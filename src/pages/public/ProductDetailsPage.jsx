import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../../services/api';
import { useCart } from '../../context/CartContext';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  if (isLoading) return <Loader />;
  if (error || !product) {
    return <ErrorMessage message={error?.message || 'Product not found.'} />;
  }

  return (
    <section className="product-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      <div className="product-details-grid">
        <div className="product-details-image-wrapper">
          <img className="product-details-image" src={product.image} alt={product.title} />
        </div>
        <div className="product-details-info">
          <span className="product-category-tag">{product.category}</span>
          <h1 className="product-title-large">{product.title}</h1>
          
          <div className="product-rating-row">
            <div className="stars">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <span className="rating-text">4.8 / 5.0 (42 reviews)</span>
          </div>

          <div className="product-price-large">₹{product.price}</div>

          <p className="product-description-text">{product.description}</p>

          <div className="details-actions">
            <button className="primary-btn checkout-btn" onClick={() => addToCart(product)}>
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
