import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinOff, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="container" data-test="not-found-page" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '4rem 1rem'
    }}>
      <div style={{
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        color: 'var(--error-color)',
        width: '5rem',
        height: '5rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        <MapPinOff size={48} />
      </div>
      
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '400px' }}>
        The destination you are looking for doesn't exist or has been moved to a new location.
      </p>
      
      <Link to="/" className="btn btn-primary" data-test="back-home-btn">
        <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
