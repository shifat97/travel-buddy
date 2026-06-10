import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import '../styles/profile.css';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      try {
        const bookings = await apiService.getMyBookings();
        setBookingCount(bookings.length);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, [user]);

  return (
    <div className="profile-page container" data-test="profile-page">
      <h1 className="section-title">My Profile</h1>

      <div className="profile-layout">
        <div className="profile-card card" data-test="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <User size={48} />
            </div>
            <div className="profile-info">
              <h2 data-test="profile-name">{user?.name}</h2>
              <p className="profile-email" data-test="profile-email">
                <Mail size={16} />
                <span>{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="profile-body">
            <div className="profile-section">
              <h3>Account Settings</h3>
              <div className="settings-list">
                <button className="settings-item" data-test="edit-profile-btn">
                  <User size={18} />
                  <span>Edit Profile Information</span>
                </button>
                <button className="settings-item" data-test="change-password-btn">
                  <Shield size={18} />
                  <span>Security & Password</span>
                </button>
                <button className="settings-item" data-test="notification-settings-btn">
                  <Settings size={18} />
                  <span>Notifications</span>
                </button>
              </div>
            </div>

            <button 
              className="btn btn-outline btn-block text-error logout-btn" 
              onClick={logout}
              data-test="profile-logout-btn"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card card">
            <span className="stat-value" data-test="profile-booking-count">{bookingCount}</span>
            <span className="stat-label">Total Bookings</span>
          </div>
          <div className="stat-card card">
            <span className="stat-value">0</span>
            <span className="stat-label">Visited Places</span>
          </div>
          <div className="stat-card card">
            <span className="stat-value">0</span>
            <span className="stat-label">Reviews Left</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
