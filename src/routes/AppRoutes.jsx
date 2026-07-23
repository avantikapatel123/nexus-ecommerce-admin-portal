import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/public/Home';
import Products from '../pages/public/Products';
import ProductDetailsPage from '../pages/public/ProductDetailsPage';
import Cart from '../pages/public/Cart';
import NotFound from '../pages/public/NotFound';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageProducts from '../pages/admin/ManageProducts';
import AddProduct from '../pages/admin/AddProduct';
import AdminLogin from '../pages/admin/Login';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import AuthGuard from '../components/auth/AuthGuard';
import { fetchProducts } from '../services/api';

// React Router loader to pre-fetch product data before catalog renders
export const productsLoader = async () => {
  try {
    return await fetchProducts();
  } catch (error) {
    console.error('Failed to pre-fetch products in loader', error);
    return [];
  }
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'products',
        element: <Products />,
        loader: productsLoader,
      },
      { path: 'products/:id', element: <ProductDetailsPage /> },
      { path: 'cart', element: <Cart /> },
      { path: 'admin/login', element: <AdminLogin /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/admin',
    element: <AuthGuard />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'products', element: <ManageProducts /> },
          { path: 'products/add', element: <AddProduct /> },
        ],
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
