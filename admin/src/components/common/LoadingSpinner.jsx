import './LoadingSpinner.css';

const LoadingSpinner = ({ fullScreen = false, size = 'medium', message = '' }) => {
  const sizeClass = `spinner-${size}`;
  
  if (fullScreen) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className={`spinner ${sizeClass}`}></div>
          {message && <p className="loading-message">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="spinner-container">
      <div className={`spinner ${sizeClass}`}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
