import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { name, password });
      console.log(res.data);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/home');
      } else {
        setErrorMessage('Login failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'An error occurred');
    }
  }

  return (
    <div className="card bg-glass">
      <div className="card-body px-4 py-5 px-md-5">
        <form onSubmit={handleLogin}>
          <div className="row">
            <h1 className="mb-3 h3">Login</h1>
          </div>

          <div className="form-outline">
            <label className="form-label" htmlFor="form3Example2">User Name</label>
            <input
              type="text"
              placeholder="Enter User Name"
              required
              name="name"
              id="form3Example2"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example4">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              required
              name="password"
              id="form3Example4"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Log-in
          </button>

          {errorMessage && (
            <div className="alert alert-danger text-center">
              <strong>{errorMessage}</strong>
            </div>
          )}

          <div className="text-center">
            <p>Don't have an account yet? <a href="/register">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
