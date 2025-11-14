import './StatusBadge.css';

const StatusBadge = ({ status, type = 'default' }) => {
  const getStatusClass = () => {
    if (type === 'order') {
      switch (status?.toLowerCase()) {
        case 'pending':
          return 'status-warning';
        case 'shipped':
          return 'status-info';
        case 'delivered':
          return 'status-success';
        case 'cancelled':
          return 'status-error';
        default:
          return 'status-default';
      }
    } else if (type === 'product') {
      switch (status?.toLowerCase()) {
        case 'active':
        case 'in stock':
          return 'status-success';
        case 'inactive':
        case 'out of stock':
          return 'status-error';
        case 'low stock':
          return 'status-warning';
        default:
          return 'status-default';
      }
    }
    return 'status-default';
  };

  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
