import express from 'express';
import {
  getDestinations,
  getDestinationById,
  createDestination,
} from '../controllers/destinationController';

const router = express.Router();

/**
 * @swagger
 * /api/destinations:
 *   get:
 *     summary: Get all destinations
 *     tags: [Destinations]
 *     responses:
 *       200:
 *         description: List of destinations
 */
router.get('/', getDestinations);

/**
 * @swagger
 * /api/destinations/{id}:
 *   get:
 *     summary: Get destination by ID
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Destination details
 *       404:
 *         description: Destination not found
 */
router.get('/:id', getDestinationById);

/**
 * @swagger
 * /api/destinations:
 *   post:
 *     summary: Create a destination
 *     tags: [Destinations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Destination created
 */
router.post('/', createDestination);

export default router;
