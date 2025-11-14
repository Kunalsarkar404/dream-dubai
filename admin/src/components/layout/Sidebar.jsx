import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiUsers,
  FiX
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/products', icon: FiPackage, label: 'Products' },
    { path: '/orders', icon: FiShoppingCart, label: 'Orders' },
    { path: '/users', icon: FiUsers, label: 'Users' },
  ];

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">DD</div>
            <span className="logo-text">Dream Dubai</span>
          </div>
          <button className="sidebar-close-btn" onClick={toggleSidebar}>
            <FiX size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={() => window.innerWidth <= 768 && toggleSidebar()}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-info">
            <p className="info-title">Admin Panel</p>
            <p className="info-version">Version 1.0.0</p>
          </div>
        </div>
      </aside>
      
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
