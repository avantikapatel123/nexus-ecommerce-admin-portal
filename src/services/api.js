const STORAGE_KEY = 'nexus-products-v3';

const fallbackProducts = [
  {
    id: 1,
    title: 'Aurora Headphones',
    price: 89,
    description: 'Immersive sound for everyday focus.',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Nova Backpack',
    price: 54,
    description: 'A sleek daily carry for work and travel.',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Lumen Lamp',
    price: 72,
    description: 'Soft ambient lighting for calm evenings.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
  },
];

const readStoredProducts = () => {
  if (typeof window === 'undefined') return fallbackProducts;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to parse stored products', error);
    return fallbackProducts;
  }
};

const writeProducts = (products) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

const fetchFromApi = async () => {
  try {
    const response1 = await fetch('https://dummyjson.com/products?limit=100&skip=0');
    if (!response1.ok) throw new Error('DummyJSON skip=0 failed');
    const data1 = await response1.json();

    const response2 = await fetch('https://dummyjson.com/products?limit=100&skip=100');
    if (!response2.ok) throw new Error('DummyJSON skip=100 failed');
    const data2 = await response2.json();

    const mergedProducts = [...(data1.products || []), ...(data2.products || [])];

    const normalizedProducts = mergedProducts.map((p) => ({
      id: p.id,
      title: p.title,
      price: Number(p.price),
      description: p.description,
      category: p.category,
      image: p.thumbnail || (p.images && p.images[0]) || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    }));

    writeProducts(normalizedProducts);
    return normalizedProducts;
  } catch (error) {
    console.warn('Falling back to local product data:', error);
    return readStoredProducts();
  }
};

export const fetchProducts = async () => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && JSON.parse(stored).length > 0) {
      return readStoredProducts();
    }
  }
  return fetchFromApi();
};

export const fetchProductById = async (id) => {
  const products = await fetchProducts();
  return products.find((product) => String(product.id) === String(id)) || null;
};

export const addProductApi = async (product) => {
  const products = readStoredProducts();
  const newProduct = {
    id: Date.now(),
    ...product,
    price: Number(product.price),
  };

  const updatedProducts = [newProduct, ...products];
  writeProducts(updatedProducts);
  return newProduct;
};

export const updateProductApi = async (product) => {
  const products = readStoredProducts();
  const updatedProducts = products.map((item) =>
    String(item.id) === String(product.id) ? { ...item, ...product, price: Number(product.price) } : item,
  );
  writeProducts(updatedProducts);
  return updatedProducts.find((item) => String(item.id) === String(product.id));
};

export const deleteProductApi = async (id) => {
  const products = readStoredProducts();
  const updatedProducts = products.filter((product) => String(product.id) !== String(id));
  writeProducts(updatedProducts);
  return { success: true, id };
};

export const fetchProductsPaginated = async ({ pageParam = 1, limit = 6, category = 'all', search = '' }) => {
  let products = await fetchProducts();

  if (category !== 'all') {
    products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const term = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term),
    );
  }

  const start = (pageParam - 1) * limit;
  const end = start + limit;

  return {
    items: products.slice(start, end),
    nextPage: end < products.length ? pageParam + 1 : undefined,
    totalCount: products.length,
  };
};