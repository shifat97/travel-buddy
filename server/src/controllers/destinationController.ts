import { Request, Response } from 'express';
import Destination from '../models/Destination';

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
const getDestinations = async (req: Request, res: Response) => {
  const destinations = await Destination.find({});
  res.json(destinations);
};

// @desc    Get destination by ID
// @route   GET /api/destinations/:id
// @access  Public
const getDestinationById = async (req: Request, res: Response) => {
  const destination = await Destination.findById(req.params.id);

  if (destination) {
    res.json(destination);
  } else {
    res.status(404).json({ message: 'Destination not found' });
  }
};

// @desc    Create a destination (Admin only - though we don't have roles yet, making it public for now to seed)
// @route   POST /api/destinations
// @access  Public/Admin
const createDestination = async (req: Request, res: Response) => {
  const { name, location, description, price, rating, category, imageUrl } = req.body;

  const destination = new Destination({
    name,
    location,
    description,
    price,
    rating,
    category,
    imageUrl,
  });

  const createdDestination = await destination.save();
  res.status(201).json(createdDestination);
};

export { getDestinations, getDestinationById, createDestination };
