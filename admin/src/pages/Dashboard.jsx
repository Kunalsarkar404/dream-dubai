import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { FiUsers, FiPackage, FiShoppingCart, FiDollarSign } from 'react-icons/fi';
import SummaryCard from '../components/common/SummaryCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { fetchDashboardData } from '../redux/thunks/dashboardThunks';
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const dispatch = useDispatch();
    const { stats, salesData, loading } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboardData());
    }, [dispatch]);

    const salesChartData = {
        labels: salesData.map((data) => data.month),
        datasets: [
            {
                label: 'Sales (AED)',
                data: salesData.map((data) => data.sales),
                backgroundColor: 'rgba(0, 105, 148, 0.8)',
                borderColor: 'rgb(0, 105, 148)',
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };

    const ordersChartData = {
        labels: salesData.map((data) => data.month),
        datasets: [
            {
                label: 'Orders',
                data: salesData.map((data) => data.orders),
                backgroundColor: 'rgba(255, 215, 0, 0.8)',
                borderColor: 'rgb(255, 215, 0)',
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };

    const salesChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return 'AED ' + value.toLocaleString();
                    }
                },
            },
        },
    };

    const ordersChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Orders',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    if (loading) {
        return <LoadingSpinner fullScreen message="Loading dashboard..." />;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p className="dashboard-subtitle">Welcome back! Here's what's happening today.</p>
            </div>

            <div className="summary-cards">
                <SummaryCard
                    title="Total Users"
                    value={stats.totalUsers?.toLocaleString() || '0'}
                    icon={FiUsers}
                    color="accent"
                />
                <SummaryCard
                    title="Total Products"
                    value={stats.totalProducts?.toLocaleString() || '0'}
                    icon={FiPackage}
                    color="primary"
                />
                <SummaryCard
                    title="Total Orders"
                    value={stats.totalOrders?.toLocaleString() || '0'}
                    icon={FiShoppingCart}
                    color="secondary"
                />
                <SummaryCard
                    title="Total Revenue"
                    value={`AED ${stats.totalRevenue?.toLocaleString() || '0'}`}
                    icon={FiDollarSign}
                    color="success"
                />
            </div>

            <div className="chart-container">
                <div className="chart-card">
                    <div style={{ height: '400px' }}>
                        <Bar data={salesChartData} options={salesChartOptions} />
                    </div>
                </div>
                <div className="chart-card">
                    <div style={{ height: '400px' }}>
                        <Bar data={ordersChartData} options={ordersChartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
