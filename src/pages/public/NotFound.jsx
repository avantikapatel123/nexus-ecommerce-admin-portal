import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container animate-fade-in">
      <h1 className="error-code">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist or has been moved.</p>
      <button className="primary-btn home-btn" onClick={() => navigate('/')}>
        <Home size={16} /> Back to Home
      </button>
    </div>
  );
}
