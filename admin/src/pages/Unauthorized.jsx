import { Link } from 'react-router-dom';
import './NotFound.css';

const Unauthorized = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="error-code">401</div>
        <h1>Unauthorized Access</h1>
        <p>You don't have permission to access this resource. Please login with proper credentials.</p>
        <Link to="/login" className="btn-primary">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
