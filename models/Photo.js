import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema(
  {
    category: String,
    imageUrl: String,
    publicId: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Photo ||
  mongoose.model('Photo', PhotoSchema);