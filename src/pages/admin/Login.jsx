import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAsAdmin } from '../../utils/auth';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export default function AdminLogin() {
  const [message, setMessage] = useState('Authorized personnel only. Access grants dashboard privileges.');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggingIn(true);
    loginAsAdmin();
    setMessage('Admin access granted. Redirecting...');
    setTimeout(() => {
      navigate('/admin');
    }, 1000);
  };

  return (
    <div className="login-page-container">
      <div className="login-card animate-fade-in">
        <div className="login-icon-wrapper">
          <ShieldCheck size={36} className="shield-icon" />
        </div>
        <h1>Nexus Control Center</h1>
        <p className="login-subtitle">{message}</p>
        
        <div className="warning-banner">
          <ShieldAlert size={16} />
          <span>This session will store credentials in mock storage.</span>
        </div>

        <button 
          className={`primary-btn login-btn ${isLoggingIn ? 'loading-btn' : ''}`}
          onClick={handleLogin} 
          disabled={isLoggingIn}
          type="button"
        >
          {isLoggingIn ? 'Verifying...' : 'Login as Admin'}
        </button>
      </div>
    </div>
  );
}
