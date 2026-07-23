import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProductApi } from '../services/api';

export default function useAddProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    addProduct: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
