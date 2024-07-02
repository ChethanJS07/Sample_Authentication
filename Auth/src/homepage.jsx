import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
      navigate('/error');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <header className="header">
        <h2>Expense Tracker</h2>
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
      </header>
      <div className="content">
        <h3>Welcome to your Expense Tracker</h3>
        <div className="expense-list">
          <div className="expense-item">
            <span>Groceries</span>
            <span>$50</span>
          </div>
          <div className="expense-item">
            <span>Rent</span>
            <span>$1200</span>
          </div>
          <div className="expense-item">
            <span>Utilities</span>
            <span>$200</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
