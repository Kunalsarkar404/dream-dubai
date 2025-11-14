import { useState, useEffect, useMemo } from 'react';
import { FiBell, FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { fetchOrders } from '../../redux/thunks/orderThunks';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasViewedNotifications, setHasViewedNotifications] = useState(false);

  // Get pending orders for notifications
  const newOrders = useMemo(() =>
    orders.filter(order => order.status === 'Pending'),
    [orders]
  );

  useEffect(() => {
    dispatch(fetchOrders({ page: 1, limit: 100 }));
  }, [dispatch]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Mark as viewed when opening notifications
      setHasViewedNotifications(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleViewOrder = () => {
    setShowNotifications(false);
    navigate('/orders');
  };

  // Calculate notification count - show 0 if already viewed
  const notificationCount = hasViewedNotifications ? 0 : newOrders.length;

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button className="hamburger-btn" onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <h1 className="header-brand">Dealz7 Admin</h1>
        </div>

        <div className="header-right">
          {/* Notifications */}
          <div className="notification-wrapper">
            <button
              className="header-icon-btn"
              title="Notifications"
              onClick={handleNotificationClick}
            >
              <FiBell size={20} />
              {notificationCount > 0 && (
                <span className="badge">{notificationCount}</span>
              )}
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h4>New Orders ({newOrders.length})</h4>
                </div>
                <div className="notification-list">
                  {newOrders.length > 0 ? (
                    newOrders.map((order) => (
                      <div
                        key={order._id}
                        className="notification-item"
                        onClick={() => handleViewOrder(order._id)}
                      >
                        <p className="notification-text">
                          New order {order.orderNumber} from {order.customerName}
                        </p>
                        <p className="notification-text notification-amount">
                          Amount: AED {order.totalAmount}
                        </p>
                        <span className="notification-time">{order.date}</span>
                      </div>
                    ))
                  ) : (
                    <div className="notification-item notification-empty">
                      <p className="notification-text">No new orders</p>
                    </div>
                  )}
                </div>
                {newOrders.length > 0 && (
                  <button
                    className="notification-view-all"
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/orders');
                    }}
                  >
                    View All Orders
                  </button>
                )}
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="user-profile">
            <div className="user-avatar">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <span className="user-name">{user?.name || 'Admin'}</span>
          </div>

          {/* Logout */}
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
