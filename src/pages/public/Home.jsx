import { useNavigate } from 'react-router-dom';
import ProductList from '../../components/product/ProductList';
import useProducts from '../../hooks/useProducts';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';

export default function Home() {
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <span className="badge">Welcome to Nexus v2</span>
          <h1>Minimal Design. <br /><span className="gradient-text">Maximum Performance.</span></h1>
          <p>
            Experience a curated selection of lifestyle, audio, and home accessories engineered for modern living.
          </p>
          <div className="hero-actions">
            <button className="primary-btn ripple" onClick={() => navigate('/products')}>
              Shop the Collection
            </button>
            <button className="secondary-btn" onClick={() => navigate('/admin')}>
              Go to Dashboard
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="glow-sphere"></div>
          <img 
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" 
            alt="Premium Aurora Headphones" 
            className="hero-image"
          />
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header-center">
          <h2>Featured Essentials</h2>
          <p>Handpicked selections representing our commitment to quality and style.</p>
        </div>

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <ProductList products={products.slice(0, 3)} />
        )}
      </section>
    </div>
  );
}
