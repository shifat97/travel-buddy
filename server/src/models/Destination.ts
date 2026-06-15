import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
