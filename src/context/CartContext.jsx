import { createContext, useContext, useEffect, useReducer } from 'react';
import { cartReducer, initialCartState } from '../reducers/cartReducer';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'nexus-cart';

const getInitialState = () => {
  if (typeof window === 'undefined') return initialCartState;

  const stored = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) return initialCartState;

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load cart state.', error);
    return initialCartState;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, getInitialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const addToCart = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        itemCount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;