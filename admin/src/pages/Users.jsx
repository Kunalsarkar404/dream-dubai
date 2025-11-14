import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/common/Table';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { fetchUsers } from '../redux/thunks/userThunks';
import './Users.css';

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, currentPage, totalPages } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage }));
  }, [dispatch, currentPage]);

  const columns = [
    { header: 'User ID', key: '_id', width: '100px' },
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    {
      header: 'Role',
      key: 'role',
      render: (row) => (
        <span className={`role-badge ${row.role.toLowerCase()}`}>
          {row.role}
        </span>
      ),
    },
    { header: 'Joined On', key: 'joinedOn' },
  ];

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading users..." />;
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <div>
          <h1>User Management</h1>
          <p className="page-subtitle">View and manage system users</p>
        </div>
      </div>

      <Table columns={columns} data={users} loading={loading} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(fetchUsers({ page }))}
      />
    </div>
  );
};

export default Users;
