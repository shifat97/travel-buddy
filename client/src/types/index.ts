export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  imageUrl: string;
}

export interface Booking {
  id: string;
  userEmail: string;
  destinationId: string;
  destinationName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  createdAt: string;
}
