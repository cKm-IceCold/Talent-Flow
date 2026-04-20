import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaApple } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { TfiFacebook } from 'react-icons/tfi';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/api';
import './Auth.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(form);
      loginUser(res.data.token, res.data.user);
      const role = res.data.user.role?.name || res.data.user.role;
      if (role === 'Admin') navigate('/admin');
      else if (role === 'Mentor') navigate('/mentor');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        <div className="logo">
          <span className="logo-dot" />
          <h3>TalentFlow</h3>
        </div>
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="johndoe@gmail.com" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password"
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁'}</span>
            </div>
            <div className="password-options">
              <label className="remember"><input type="checkbox" /> Keep me logged in</label>
              <Link to="/reset" className="forgot">Forgot password?</Link>
            </div>
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          <div className="divider"><span /><p>or sign in with</p><span /></div>
          <div className="socials">
            <button type="button"><FaApple /></button>
            <button type="button"><FcGoogle /></button>
            <button type="button"><TfiFacebook /></button>
          </div>
          <p className="auth-switch">New to TalentFlow? <Link to="/register">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
