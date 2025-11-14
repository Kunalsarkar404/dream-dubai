import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="error-page">
            <div className="error-content">
                <div className="error-code">404</div>
                <h1>Page Not Found</h1>
                <p>The page you're looking for doesn't exist or has been moved.</p>
                <Link to="/dashboard" className="btn-primary">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
