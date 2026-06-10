import { Request, Response } from 'express';
import Booking from '../models/Booking';

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const addBooking = async (req: AuthRequest, res: Response) => {
  const {
    destinationId,
    destinationName,
    checkInDate,
    checkOutDate,
    guests,
    totalPrice,
  } = req.body;

  const booking = new Booking({
    user: req.user._id,
    destination: destinationId,
    destinationName,
    checkInDate,
    checkOutDate,
    guests,
    totalPrice,
  });

  const createdBooking = await booking.save();
  res.status(201).json(createdBooking);
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req: AuthRequest, res: Response) => {
  const bookings = await Booking.find({ user: req.user._id });
  res.json(bookings);
};

export { addBooking, getMyBookings };
