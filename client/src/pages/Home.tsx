import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { INITIAL_DESTINATIONS } from '../data/destinations';
import '../styles/home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredDestinations = INITIAL_DESTINATIONS.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    
    navigate(`/destinations?${params.toString()}`);
  };

  return (
    <div className="home-page" data-test="home-page">
      {/* Hero Section */}
      <section className="hero" data-test="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title" data-test="hero-title">
              Discover Your Next <span className="text-primary">Great Adventure</span>
            </h1>
            <p className="hero-subtitle">
              Explore the world's most beautiful destinations, from serene beaches to majestic mountains.
            </p>

            <form className="search-bar" onSubmit={handleSearch} data-test="home-search-form">
              <div className="search-input-group">
                <MapPin className="search-icon" size={20} />
                <div className="input-stack">
                  <label className="input-label">Location</label>
                  <input 
                    type="text" 
                    placeholder="Where are you going?" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-test="home-search-input"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary search-btn" data-test="home-search-btn">
                <Search size={20} />
                <span>Search</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="featured-section container">
        <div className="section-header">
          <h2 className="section-title">Featured Destinations</h2>
          <button 
            className="btn btn-outline" 
            onClick={() => navigate('/destinations')}
            data-test="view-all-destinations-btn"
          >
            View All <ArrowRight size={16} style={{marginLeft: '0.5rem'}} />
          </button>
        </div>

        <div className="destination-grid">
          {featuredDestinations.map((dest) => (
            <div key={dest.id} className="destination-card card" data-test={`featured-dest-${dest.id}`}>
              <div className="card-image-wrapper">
                <img src={dest.imageUrl} alt={dest.name} className="card-image" />
                <div className="card-badge">{dest.category}</div>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{dest.name}</h3>
                  <div className="card-rating">
                    <Star size={14} className="star-icon" fill="currentColor" />
                    <span>{dest.rating}</span>
                  </div>
                </div>
                <div className="card-location">
                  <MapPin size={14} />
                  <span>{dest.location}</span>
                </div>
                <p className="card-description">{dest.description}</p>
                <div className="card-footer">
                  <div className="card-price">
                    <span className="price-value">${dest.price}</span>
                    <span className="price-unit">/ night</span>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/destinations/${dest.id}`)}
                    data-test={`explore-btn-${dest.id}`}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-bg">
        <div className="container features-section">
          <div className="feature-item" data-test="feature-best-prices">
            <div className="feature-icon-wrapper">
              <Star className="feature-icon" />
            </div>
            <h3>Best Prices</h3>
            <p>We guarantee the best prices for all our destinations.</p>
          </div>
          <div className="feature-item" data-test="feature-safe-travel">
            <div className="feature-icon-wrapper">
              <Users className="feature-icon" />
            </div>
            <h3>Safe Travel</h3>
            <p>Your safety is our top priority with verified stays.</p>
          </div>
          <div className="feature-item" data-test="feature-easy-booking">
            <div className="feature-icon-wrapper">
              <Calendar className="feature-icon" />
            </div>
            <h3>Easy Booking</h3>
            <p>Book your dream vacation in just a few clicks.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
