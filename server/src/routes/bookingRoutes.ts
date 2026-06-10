import express from 'express';
import { addBooking, getMyBookings } from '../controllers/bookingController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destinationId:
 *                 type: string
 *               destinationName:
 *                 type: string
 *               checkInDate:
 *                 type: string
 *               checkOutDate:
 *                 type: string
 *               guests:
 *                 type: number
 *               totalPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Booking created
 *       401:
 *         description: Not authorized
 */
router.post('/', protect, addBooking);

/**
 * @swagger
 * /api/bookings/mybookings:
 *   get:
 *     summary: Get logged in user bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings
 *       401:
 *         description: Not authorized
 */
router.get('/mybookings', protect, getMyBookings);

export default router;
