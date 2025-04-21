import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";

export default function AdminHome() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userRes, orderRes, productRes, revenueRes] = await Promise.all([
          axios.get("http://localhost:3000/api/v1/dashboard/userCount"),
          axios.get("http://localhost:3000/api/v1/dashboard/orderCount"),
          axios.get("http://localhost:3000/api/v1/dashboard/productCount"),
          axios.get("http://localhost:3000/api/v1/dashboard/totalRevenue"),
        ]);

        setUsers(userRes.data.totalUsers);
        setOrders(orderRes.data.totalOrders);
        setProducts(productRes.data.totalProducts);
        setTotalRevenue(revenueRes.data.totalRevenue);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const formattedRevenue = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
  }).format(totalRevenue)
  

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
      </div>
    </div>
  );
}
