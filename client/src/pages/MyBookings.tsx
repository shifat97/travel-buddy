import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StorageService from '../services/storageService';
import type { Booking } from '../types';
import '../styles/my-bookings.css';

const MyBookings: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (user) {
      const data = StorageService.getBookingsByUser(user.email);
      setBookings(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="my-bookings-page container" data-test="my-bookings-page">
      <div className="section-header">
        <h1 className="section-title">My Bookings</h1>
        <p className="section-subtitle">Manage and view your travel reservations</p>
      </div>

      {bookings.length > 0 ? (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-item card" data-test={`booking-item-${booking.id}`}>
              <div className="booking-main">
                <div className="booking-info-group">
                  <h3 className="booking-dest-name">{booking.destinationName}</h3>
                  <div className="booking-meta">
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>{formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}</span>
                    </div>
                    <div className="meta-item">
                      <Users size={16} />
                      <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>

                <div className="booking-status-group">
                  <div className={`status-badge ${booking.status}`} data-test="booking-status">
                    {booking.status === 'confirmed' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    <span>{booking.status.toUpperCase()}</span>
                  </div>
                  <div className="booking-price">${booking.totalPrice}</div>
                </div>
              </div>

              <div className="booking-actions">
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => navigate(`/destinations/${booking.destinationId}`)}
                  data-test="view-destination-btn"
                >
                  View Destination
                </button>
                <button 
                  className="btn btn-outline btn-sm text-error" 
                  disabled
                  data-test="cancel-booking-btn"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-bookings" data-test="no-bookings">
          <Calendar size={64} className="no-bookings-icon" />
          <h2>No bookings found</h2>
          <p>You haven't made any travel reservations yet. Start exploring now!</p>
          <button className="btn btn-primary" onClick={() => navigate('/destinations')}>
            Explore Destinations
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
