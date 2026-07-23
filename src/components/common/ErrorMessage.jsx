import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ message }) {
  return (
    <div className="error-card animate-fade-in" role="alert">
      <AlertCircle size={24} className="error-icon" />
      <div className="error-details">
        <h4>Operation Error</h4>
        <p>{message || 'Something went wrong. Please check your network or try again.'}</p>
      </div>
    </div>
  );
}
