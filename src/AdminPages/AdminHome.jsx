import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './admin.css'

// Register ChartJS components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

export default function AdminHome() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState();
  const [users, setUsers] = useState(0);

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userRes, orderRes, productRes, revenueRes, monthlyOrdersRes, monthlyRevenueRes] = await Promise.all([
          axios.get("http://localhost:3000/api/v1/dashboard/userCount"),
          axios.get("http://localhost:3000/api/v1/dashboard/orderCount"),
          axios.get("http://localhost:3000/api/v1/dashboard/productCount"),
          axios.get("http://localhost:3000/api/v1/dashboard/totalRevenue"),
          axios.get("http://localhost:3000/api/v1/dashboard/totalOrdersMonthly"),
          axios.get("http://localhost:3000/api/v1/dashboard/totalRevenueMonthly")
        ]);

        setUsers(userRes.data.totalUsers);
        setOrders(orderRes.data.totalOrders);
        setProducts(productRes.data.totalProducts);
        setTotalRevenue(revenueRes.data.totalRevenue);
        setMonthlyRevenue(monthlyRevenueRes.data.data.map(x => Number(x)));
        setMonthlyOrders(monthlyOrdersRes.data.data.map(x => Number(x)));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const formattedRevenue = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
  }).format(totalRevenue);
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Revenue (LKR)',
        data: monthlyRevenue,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointRadius: 6,
        pointHoverRadius: 8,
        yAxisID: 'y' // Primary y-axis
      },
      {
        label: 'Monthly Orders (Count)',
        data: monthlyOrders,
        fill: true,
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
        borderColor: 'rgba(255, 193, 7, 1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(255, 193, 7, 1)',
        pointBorderColor: '#fff',
        pointRadius: 6,
        pointHoverRadius: 8,
        yAxisID: 'y1' // Secondary y-axis
      }
    ]
  };
    
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Performance Overview',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            
            if (label.includes('Revenue')) {
              return `${label}: LKR ${value.toLocaleString()}`;
            } else {
              return `${label}: ${value.toLocaleString()}`;
            }
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(75, 192, 192, 0.1)'
        },
        ticks: {
          font: {
            size: 12
          },
          callback: function(value) {
            return 'LKR ' + value.toLocaleString();
          }
        },
        title: {
          display: true,
          text: 'Revenue (LKR)',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: 'rgba(75, 192, 192, 1)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false, // only show grid for left y-axis
        },
        ticks: {
          font: {
            size: 12
          }
        },
        title: {
          display: true,
          text: 'Orders (Count)',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: 'rgba(255, 193, 7, 1)'
        }
      }
    }
  };

  return (
    <div className="admin-home">
      <div className="cards-container">
        <div className="card revenue">
          <h2>Total Revenue</h2>
          <p className="value">{formattedRevenue}</p>
          <span>Total earnings this month</span>
        </div>

        <div className="card products">
          <h2>Products</h2>
          <p className="value">{products}</p>
          <span>Active products in store</span>
        </div>

        <div className="card orders">
          <h2>Orders</h2>
          <p className="value">{orders}</p>
          <span>Orders this month</span>
        </div>

        <div className="card users">
          <h2>Users</h2>
          <p className="value">{users}</p>
          <span>Registered customers</span>
        </div>
        
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}