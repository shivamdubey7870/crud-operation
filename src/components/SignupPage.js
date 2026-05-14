import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const [roles, setRoles] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (roles.length === 0) {
      setError('Please select at least one role');
      return;
    }
    try {
      const response = await fetch('http://localhost:8090/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, roles }),
      });
    
      if (response.ok) {
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        setError(errorData.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="auth-page">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Roles:</label>
          <div className="multi-select-dropdown">
            <div 
              className="dropdown-header"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{roles.length > 0 ? roles.join(', ') : 'Select options'}</span>
              <span className="dropdown-arrow">▼</span>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-options">
                <div className="checkbox-option">
                  <input
                    type="checkbox"
                    id="user-role"
                    value="user"
                    checked={roles.includes('user')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRoles([...roles, 'user']);
                      } else {
                        setRoles(roles.filter(r => r !== 'user'));
                      }
                    }}
                  />
                  <label htmlFor="user-role">User</label>
                </div>
                <div className="checkbox-option">
                  <input
                    type="checkbox"
                    id="admin-role"
                    value="admin"
                    checked={roles.includes('admin')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRoles([...roles, 'admin']);
                      } else {
                        setRoles(roles.filter(r => r !== 'admin'));
                      }
                    }}
                  />
                  <label htmlFor="admin-role">Admin</label>
                </div>
                <div className="checkbox-option">
                  <input
                    type="checkbox"
                    id="manager-role"
                    value="manager"
                    checked={roles.includes('manager')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRoles([...roles, 'manager']);
                      } else {
                        setRoles(roles.filter(r => r !== 'manager'));
                      }
                    }}
                  />
                  <label htmlFor="manager-role">Manager</label>
                </div>
              </div>
            )}
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default SignupPage;