/**
 * StorageService handles all interactions with LocalStorage.
 * It provides methods to get, set, and remove items, and specifically
 * handles the mock database for users, destinations, and bookings.
 */

const STORAGE_KEYS = {
  USERS: 'travel_buddy_users',
  DESTINATIONS: 'travel_buddy_destinations',
  BOOKINGS: 'travel_buddy_bookings',
  CURRENT_USER: 'travel_buddy_current_user',
};

class StorageService {
  // Generic methods
  private static getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  private static setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // User methods
  static getUsers(): any[] {
    return this.getItem<any[]>(STORAGE_KEYS.USERS) || [];
  }

  static saveUser(user: any): void {
    const users = this.getUsers();
    users.push(user);
    this.setItem(STORAGE_KEYS.USERS, users);
  }

  static findUserByEmail(email: string): any | null {
    const users = this.getUsers();
    return users.find((u) => u.email === email) || null;
  }

  // Auth session
  static setCurrentUser(user: any | null): void {
    if (user) {
      this.setItem(STORAGE_KEYS.CURRENT_USER, user);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  static getCurrentUser(): any | null {
    return this.getItem<any>(STORAGE_KEYS.CURRENT_USER);
  }

  // Destinations (Initial seed data will be handled elsewhere)
  static getDestinations(): any[] {
    return this.getItem<any[]>(STORAGE_KEYS.DESTINATIONS) || [];
  }

  static setDestinations(destinations: any[]): void {
    this.setItem(STORAGE_KEYS.DESTINATIONS, destinations);
  }

  // Bookings
  static getBookings(): any[] {
    return this.getItem<any[]>(STORAGE_KEYS.BOOKINGS) || [];
  }

  static addBooking(booking: any): void {
    const bookings = this.getBookings();
    bookings.push(booking);
    this.setItem(STORAGE_KEYS.BOOKINGS, bookings);
  }

  static getBookingsByUser(userEmail: string): any[] {
    const bookings = this.getBookings();
    return bookings.filter((b) => b.userEmail === userEmail);
  }
}

export default StorageService;
