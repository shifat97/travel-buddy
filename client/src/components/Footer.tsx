import React from 'react';
import { MapPin, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';
import '../styles/footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer" data-test="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="footer-logo">
            <MapPin size={24} />
            <span>TravelBuddy</span>
          </div>
          <p className="footer-desc">
            Discover your next adventure with TravelBuddy. We provide the best travel experiences around the world.
          </p>
          <div className="footer-socials">
            <a href="#" data-test="footer-social-fb"><Facebook size={20} /></a>
            <a href="#" data-test="footer-social-tw"><Twitter size={20} /></a>
            <a href="#" data-test="footer-social-ig"><Instagram size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/" data-test="footer-link-home">Home</a></li>
            <li><a href="/destinations" data-test="footer-link-destinations">Destinations</a></li>
            <li><a href="/login" data-test="footer-link-login">Login</a></li>
            <li><a href="/register" data-test="footer-link-signup">Sign Up</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Categories</h4>
          <ul className="footer-links">
            <li><a href="#">Beach</a></li>
            <li><a href="#">Adventure</a></li>
            <li><a href="#">Cultural</a></li>
            <li><a href="#">Nature</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Contact Us</h4>
          <ul className="footer-contact">
            <li><Mail size={16} /> <span>support@travelbuddy.com</span></li>
            <li><Phone size={16} /> <span>+1 (555) 000-0000</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} TravelBuddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
