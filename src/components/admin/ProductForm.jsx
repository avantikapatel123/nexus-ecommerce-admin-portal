import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAddProduct from '../../hooks/useAddProduct';

const defaultValues = {
  title: '',
  price: '',
  category: '',
  description: '',
  image: '',
};

export default function ProductForm() {
  const [form, setForm] = useState(defaultValues);
  const { addProduct, isLoading, error } = useAddProduct();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addProduct({
        ...form,
        price: Number(form.price),
      });
      setForm(defaultValues);
      navigate('/admin/products');
    } catch (err) {
      console.error('Failed to create product', err);
    }
  };

  return (
    <form className="product-form animate-fade-in" onSubmit={handleSubmit}>
      {error && <div className="error-message-banner">{error.message || 'Failed to save product.'}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input 
          id="title"
          name="title" 
          placeholder="e.g. Premium Noise-Cancelling Headphones"
          value={form.title} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input 
            id="price"
            name="price" 
            type="number" 
            placeholder="e.g. 89"
            value={form.price} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input 
            id="category"
            name="category" 
            placeholder="e.g. Audio, Home, Lifestyle"
            value={form.category} 
            onChange={handleChange} 
            required 
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea 
          id="description"
          name="description" 
          placeholder="Describe the product features, specifications, and styling..."
          value={form.description} 
          onChange={handleChange} 
          rows={4}
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input 
          id="image"
          name="image" 
          placeholder="https://images.unsplash.com/... or similar image link"
          value={form.image} 
          onChange={handleChange} 
          required 
        />
      </div>

      <button className="primary-btn submit-btn" type="submit" disabled={isLoading}>
        {isLoading ? 'Creating Product...' : 'Create Product'}
      </button>
    </form>
  );
}
