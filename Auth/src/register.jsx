import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Username is required');
      return;
    }
    axios.post('http://localhost:3000/api/auth/register', { name, email, password })
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
        setErrorMessage(err.response?.data?.message || 'An error occurred');
      });
  }

  return (
    <div className="card bg-glass">
      <div className="card-body px-4 py-5 px-md-5">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <h1 className="mb-3 h3">Register</h1>
            <div className="col-md-12 mb-4">
              <div className="form-outline">
                <label className="form-label" htmlFor="form3Example2">User Name</label>
                <input
                  type="text"
                  placeholder="Enter User Name"
                  name="name"
                  id="form3Example2"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example3">Email address</label>
            <input
              type="email"
              placeholder="Enter Email-Id"
              name="email"
              id="form3Example3"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example4">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              id="form3Example4"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign up
          </button>

          {errorMessage && (
            <div className="alert alert-danger text-center">
              <strong>{errorMessage}</strong>
            </div>
          )}

          <div className="text-center">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
