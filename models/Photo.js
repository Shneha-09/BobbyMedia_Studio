import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema(
  {
    category: String,
    imageUrl: String,
    publicId: String,

    likes: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "gallery" // gallery | featured
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Photo ||
  mongoose.model('Photo', PhotoSchema);