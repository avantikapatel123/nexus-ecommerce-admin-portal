import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductApi } from '../services/api';

export default function useDeleteProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    deleteProduct: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
