import React from "react";
import "./admin.css";

export default function AdminHome() {
  return (
    <div className="admin-home">
      <div className="cards-container">
        <div className="card revenue">
          <h2>Total Revenue</h2>
          <p className="value">$15,231.89</p>
          <span>Total earnings this month</span>
        </div>

        <div className="card products">
          <h2>Products</h2>
          <p className="value">258</p>
          <span>Active products in store</span>
        </div>

        <div className="card orders">
          <h2>Orders</h2>
          <p className="value">123</p>
          <span>Orders this month</span>
        </div>

        <div className="card users">
          <h2>Users</h2>
          <p className="value">573</p>
          <span>Registered customers</span>
        </div>
      </div>
    </div>
  );
}
