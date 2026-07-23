import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { LikesProvider } from './context/LikesContext';
import { AdminProfileProvider } from './context/AdminProfileContext';
import './App.css';

function App() {
  return (
    <AdminProfileProvider>
      <LikesProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </LikesProvider>
    </AdminProfileProvider>
  );
}

export default App;
