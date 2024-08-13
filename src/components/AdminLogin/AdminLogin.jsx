/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000); // Hide popup after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("logged in as admin")
    // Replace these with your actual admin credentials
    const adminUsername = 'admin';
    const adminPassword = 'admin123';

    if (username === adminUsername && password === adminPassword) {
      onLogin(true);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '15px',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 1000,
          animation: 'fadeIn 0.5s'
        }}>
          <p>Default Username: admin</p>
          <p>Default Password: admin123</p>
        </div>
      )}
      <div style={{
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '300px'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '1.5rem'
        }}>Admin Login</h2>
        <form onSubmit={handleLogin} style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              marginBottom: '1rem',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginBottom: '1rem',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button type="submit" style={{
            padding: '0.5rem',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}>Login</button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default AdminLogin;