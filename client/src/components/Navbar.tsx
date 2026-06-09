import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, User as UserIcon, LogOut, Menu, X } from 'lucide-react';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar" data-test="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" data-test="nav-logo">
          <MapPin className="logo-icon" />
          <span>TravelBuddy</span>
        </Link>

        <div className="navbar-desktop">
          <Link to="/destinations" className="nav-link" data-test="nav-destinations">Destinations</Link>
          {isAuthenticated ? (
            <>
              <Link to="/bookings" className="nav-link" data-test="nav-my-bookings">My Bookings</Link>
              <div className="nav-user-dropdown">
                <button className="nav-user-btn" data-test="nav-user-profile">
                  <UserIcon size={18} />
                  <span>{user?.name}</span>
                </button>
                <div className="dropdown-content">
                  <Link to="/profile" data-test="nav-profile-link">Profile</Link>
                  <button onClick={handleLogout} data-test="nav-logout-btn">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="nav-auth-btns">
              <Link to="/login" className="btn btn-outline" data-test="nav-login-btn">Login</Link>
              <Link to="/register" className="btn btn-primary" data-test="nav-register-btn">Sign Up</Link>
            </div>
          )}
        </div>

        <button 
          className="navbar-mobile-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-test="nav-mobile-toggle"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="navbar-mobile" data-test="nav-mobile-menu">
          <Link to="/destinations" onClick={() => setIsMenuOpen(false)}>Destinations</Link>
          {isAuthenticated ? (
            <>
              <Link to="/bookings" onClick={() => setIsMenuOpen(false)}>My Bookings</Link>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
