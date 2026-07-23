import { useNavigate } from 'react-router-dom';
import useDeleteProduct from '../../hooks/useDeleteProduct';
import { Trash2, Plus, AlertCircle } from 'lucide-react';

export default function ProductTable({ products }) {
  const { deleteProduct, isLoading } = useDeleteProduct();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    }
  };

  return (
    <div className="table-card animate-fade-in">
      <div className="table-actions">
        <div>
          <h3>Products Catalog</h3>
          <p className="table-subtitle">Manage all active storefront items</p>
        </div>
        <button className="primary-btn add-btn-table" onClick={() => navigate('/admin/products/add')} type="button">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="empty-table-state">
          <AlertCircle size={32} />
          <p>No products found. Start by adding a product.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="product-table">
            <thead>
              <tr>
                <th>Product Info</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="product-info-cell">
                    <img className="product-table-thumb" src={product.image} alt={product.title} />
                    <div className="product-details-summary">
                      <span className="product-title-text">{product.title}</span>
                      <span className="product-desc-truncate">{product.description}</span>
                    </div>
                  </td>
                  <td>
                    <span className="category-pill">{product.category}</span>
                  </td>
                  <td>
                    <span className="price-tag-table">₹{product.price}</span>
                  </td>
                  <td className="text-right">
                    <button 
                      className="delete-icon-btn" 
                      onClick={() => handleDelete(product.id)} 
                      disabled={isLoading}
                      title="Delete Product"
                      type="button"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
