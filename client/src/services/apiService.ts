import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5001/api';

const getHeaders = () => {
  const token = Cookies.get('travel_buddy_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const apiService = {
  // Auth
  async login(credentials: any) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    const data = await response.json();
    if (data.token) {
      Cookies.set('travel_buddy_token', data.token, { expires: 30 }); // Store token in cookie for 30 days
      Cookies.set('travel_buddy_user', JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email
      }), { expires: 30 });
    }
    return data;
  },

  async register(userData: any) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    const data = await response.json();
    if (data.token) {
      Cookies.set('travel_buddy_token', data.token, { expires: 30 });
      Cookies.set('travel_buddy_user', JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email
      }), { expires: 30 });
    }
    return data;
  },

  async resetPassword(email: string, newPassword: string) {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Password reset failed');
    }
    return response.json();
  },

  logout() {
    Cookies.remove('travel_buddy_token');
    Cookies.remove('travel_buddy_user');
  },

  // Destinations
  async getDestinations() {
    const response = await fetch(`${API_URL}/destinations`);
    if (!response.ok) throw new Error('Failed to fetch destinations');
    return response.json();
  },

  async getDestinationById(id: string) {
    const response = await fetch(`${API_URL}/destinations/${id}`);
    if (!response.ok) throw new Error('Failed to fetch destination');
    return response.json();
  },

  // Bookings
  async getMyBookings() {
    const response = await fetch(`${API_URL}/bookings/mybookings`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
  },

  async createBooking(bookingData: any) {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) throw new Error('Failed to create booking');
    return response.json();
  },
};
