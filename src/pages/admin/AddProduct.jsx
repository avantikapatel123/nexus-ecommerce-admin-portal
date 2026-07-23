import ProductForm from '../../components/admin/ProductForm';

export default function AddProduct() {
  return (
    <div className="admin-add-product-container">
      <div className="dashboard-header">
        <div>
          <h2>Add New Product</h2>
          <p className="subtitle">Publish a new item to the store catalog</p>
        </div>
      </div>
      <div className="admin-form-card">
        <ProductForm />
      </div>
    </div>
  );
}
