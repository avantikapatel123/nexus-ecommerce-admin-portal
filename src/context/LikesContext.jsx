import { createContext, useContext, useEffect, useState } from 'react';

const LikesContext = createContext(null);
const LIKES_STORAGE_KEY = 'nexus-likes';

export const LikesProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState(() => {
    if (typeof window === 'undefined') return [];
    const stored = window.localStorage.getItem(LIKES_STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likedProducts));
  }, [likedProducts]);

  const toggleLike = (product) => {
    setLikedProducts((prev) => {
      const exists = prev.some((item) => String(item.id) === String(product.id));
      if (exists) {
        return prev.filter((item) => String(item.id) !== String(product.id));
      } else {
        return [...prev, product];
      }
    });
  };

  const isLiked = (id) => {
    return likedProducts.some((item) => String(item.id) === String(id));
  };

  return (
    <LikesContext.Provider value={{ likedProducts, toggleLike, isLiked }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => useContext(LikesContext);

export default LikesProvider;
