import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, Users, Shield, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import type { Destination } from '../types';
import '../styles/destination-detail.css';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [destination, setDestination] = useState<Destination | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      if (!id) return;
      try {
        const data = await apiService.getDestinationById(id);
        setDestination(data);
      } catch (error) {
        console.error('Error fetching destination:', error);
        navigate('/404');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDestination();
  }, [id, navigate]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/destinations/${id}` } } });
      return;
    }

    if (!checkIn || !checkOut) {
      setMessage({ type: 'error', text: 'Please select both check-in and check-out dates.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
      
      if (nights <= 0) {
        throw new Error('Check-out date must be after check-in date.');
      }

      const bookingData = {
        destinationId: destination!._id || destination!.id,
        destinationName: destination!.name,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guests,
        totalPrice: destination!.price * nights * guests,
      };

      await apiService.createBooking(bookingData);
      setMessage({ type: 'success', text: 'Booking confirmed! Redirecting to your bookings...' });
      
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="container">Loading...</div>;
  if (!destination) return <div className="container">Destination not found</div>;

  return (
    <div className="destination-detail-page container" data-test="destination-detail-page">
      <div className="detail-layout">
        <div className="detail-main">
          <div className="breadcrumb">
            <button onClick={() => navigate('/destinations')} data-test="back-to-destinations">Destinations</button>
            <span> / </span>
            <span>{destination.name}</span>
          </div>

          <h1 className="detail-title">{destination.name}</h1>
          <div className="detail-meta">
            <div className="meta-item">
              <MapPin size={18} />
              <span>{destination.location}</span>
            </div>
            <div className="meta-item">
              <Star size={18} className="star-icon" fill="currentColor" />
              <span>{destination.rating} (120 reviews)</span>
            </div>
          </div>

          <div className="detail-image-wrapper">
            <img src={destination.imageUrl} alt={destination.name} className="detail-image" />
          </div>

          <div className="detail-description">
            <h2 className="section-title">About this destination</h2>
            <p>{destination.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="detail-amenities">
            <h3 className="sub-title">What this place offers</h3>
            <div className="amenities-grid">
              <div className="amenity-item"><Shield size={20} /> <span>Free Cancellation</span></div>
              <div className="amenity-item"><Users size={20} /> <span>Group Friendly</span></div>
              <div className="amenity-item"><Calendar size={20} /> <span>Instant Confirmation</span></div>
            </div>
          </div>
        </div>

        <aside className="booking-sidebar">
          <div className="booking-card card" data-test="booking-card">
            <div className="booking-header">
              <div className="booking-price">
                <span className="price-value">${destination.price}</span>
                <span className="price-unit">/ night</span>
              </div>
            </div>

            {message && (
              <div className={`booking-message ${message.type}`} data-test="booking-message">
                {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span>{message.text}</span>
              </div>
            )}

            <form className="booking-form" onSubmit={handleBooking} data-test="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Check-in</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    data-test="check-in-date"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Check-out</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    data-test="check-out-date"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Guests</label>
                <select 
                  className="form-input" 
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  data-test="guest-select"
                >
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block" 
                disabled={isSubmitting}
                data-test="confirm-booking-btn"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    <span>Processing...</span>
                  </>
                ) : (
                  isAuthenticated ? 'Confirm Booking' : 'Login to Book'
                )}
              </button>
            </form>

            <div className="booking-info">
              <p>You won't be charged yet</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DestinationDetail;
