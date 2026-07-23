import { useMemo } from 'react';
import ProductTable from '../../components/admin/ProductTable';
import useProducts from '../../hooks/useProducts';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { Package, Folder, Star, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const { products, loading, error, refreshProducts } = useProducts();

  const stats = useMemo(() => {
    const categories = [...new Set(products.map((product) => product.category))];
    const totalInventoryValue = products.reduce((acc, product) => acc + product.price, 0);
    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      featuredCategory: categories[0] || 'None',
      totalValue: Math.round(totalInventoryValue),
    };
  }, [products]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>Executive Dashboard</h2>
          <p className="subtitle">Real-time store metrics and overview</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Package size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Products</span>
            <span className="stat-value">{stats.totalProducts}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <Folder size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Categories</span>
            <span className="stat-value">{stats.totalCategories}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <DollarSign size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Inventory Value</span>
            <span className="stat-value">₹{stats.totalValue}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper orange">
            <Star size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Top Category</span>
            <span className="stat-value text-truncate">{stats.featuredCategory}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content-table">
        <ProductTable products={products} refreshProducts={refreshProducts} />
      </div>
    </div>
  );
}
