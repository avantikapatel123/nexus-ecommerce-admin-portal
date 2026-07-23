import ProductTable from '../../components/admin/ProductTable';
import useProducts from '../../hooks/useProducts';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';

export default function ManageProducts() {
  const { products, loading, error, refreshProducts } = useProducts();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="admin-manage-products">
      <div className="dashboard-header">
        <div>
          <h2>Manage Products</h2>
          <p className="subtitle">Update pricing, manage inventory, and create catalog items</p>
        </div>
      </div>
      <div className="dashboard-content-table">
        <ProductTable products={products} refreshProducts={refreshProducts} />
      </div>
    </div>
  );
}
