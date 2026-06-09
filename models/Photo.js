import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Photo ||
  mongoose.model('Photo', PhotoSchema);