import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEye } from 'react-icons/fi';
import Table from '../components/common/Table';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { setFilters } from '../redux/slices/orderSlice';
import { fetchOrders, fetchOrderById, updateOrderStatus as updateOrderStatusThunk } from '../redux/thunks/orderThunks';
import './Orders.css';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, currentPage, totalPages, filters, currentOrder } = useSelector((state) => state.orders);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    dispatch(fetchOrders({ page: currentPage }));
  }, [dispatch, currentPage, filters]);

  const handleSearch = (value) => {
    dispatch(setFilters({ search: value }));
  };

  const handleStatusFilter = (e) => {
    dispatch(setFilters({ status: e.target.value }));
  };

  const handleViewDetails = async (order) => {
    try {
      await dispatch(fetchOrderById(order._id));
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
    setSelectedStatus(order.status);
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = async () => {
    if (!currentOrder) return;

    try {
      await dispatch(updateOrderStatusThunk(currentOrder._id, selectedStatus));
      setShowDetailsModal(false);
      dispatch(fetchOrders({ page: currentPage }));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const columns = [
    { header: 'Order ID', key: '_id' },
    { header: 'Customer Name', key: 'customerName' },
    { header: 'Email', key: 'customerEmail' },
    {
      header: 'Total Amount',
      key: 'totalAmount',
      render: (row) => `AED ${row.totalAmount}`,
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} type="order" />,
    },
    { header: 'Date', key: 'date' },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <button
          className="btn-icon btn-view"
          onClick={() => handleViewDetails(row)}
          title="View Details"
        >
          <FiEye size={16} />
        </button>
      ),
    },
  ];

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading orders..." />;
  }

  return (
    <div className="orders-page">
      <div className="page-header">
        <div>
          <h1>Order Management</h1>
          <p className="page-subtitle">Manage customer orders</p>
        </div>
      </div>

      <div className="filters-bar">
        <SearchBar
          value={filters.search}
          onChange={handleSearch}
          placeholder="Search orders..."
        />
        <select value={filters.status} onChange={handleStatusFilter} className="filter-select">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <Table columns={columns} data={orders} loading={loading} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(setFilters({ currentPage: page }))}
      />

      {/* Order Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Order Details"
        size="large"
      >
        {currentOrder && (
          <div className="order-details">
            <div className="details-section">
              <h3>Order Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Order ID:</span>
                  <span className="detail-value">{currentOrder._id}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{currentOrder.date}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Customer:</span>
                  <span className="detail-value">{currentOrder.customerName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{currentOrder.customerEmail}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{currentOrder.customerPhone}</span>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Shipping Address</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Street:</span>
                  <span className="detail-value">{currentOrder.shippingAddress?.street}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">City:</span>
                  <span className="detail-value">{currentOrder.shippingAddress?.city}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">State/Emirate:</span>
                  <span className="detail-value">{currentOrder.shippingAddress?.emirate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Country:</span>
                  <span className="detail-value">{currentOrder.shippingAddress?.country}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Zip Code:</span>
                  <span className="detail-value">{currentOrder.shippingAddress?.zipCode}</span>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Order Items</h3>
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrder.items?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>AED {item.price}</td>
                      <td>AED {item.quantity * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="order-total">
                <span>Total:</span>
                <span className="total-amount">AED {currentOrder.totalAmount}</span>
              </div>
            </div>

            <div className="details-section">
              <h3>Update Order Status</h3>
              <div className="status-update-group">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="status-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button className="btn-primary" onClick={handleUpdateStatus}>
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
