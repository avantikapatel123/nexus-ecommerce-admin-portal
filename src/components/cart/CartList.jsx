import CartItem from './CartItem';

export default function CartList({ items }) {
  if (!items.length) {
    return <p className="status-text">Your cart is empty.</p>;
  }

  return (
    <div className="cart-list">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
