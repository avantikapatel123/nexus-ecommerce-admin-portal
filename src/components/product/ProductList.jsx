import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  if (!products.length) {
    return <p className="status-text">No products match your search.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
