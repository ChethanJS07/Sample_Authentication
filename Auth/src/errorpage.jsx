import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Error() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">404 - Page Not Found</h1>
      <p className="lead">Sorry, the page you are looking for does not exist.</p>
      <p>Please log in to access the protected resources.</p>
      <button className="btn btn-primary" onClick={handleLoginRedirect}>
        Go to Login
      </button>
    </div>
  );
}

export default Error;
