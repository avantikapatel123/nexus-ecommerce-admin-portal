import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/api';

export default function useProducts() {
  const { data: products = [], isLoading: loading, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return {
    products,
    loading,
    error: error ? error.message || 'Unable to load products.' : '',
    refreshProducts: refetch,
  };
}
