import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: String,
  price: { type: Number, required: true },
  images: [{ type: String }],           // URLs
  category: { type: String, index: true },
  brand: String,
  stock: { type: Number, default: 0 },  // inventory
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 0 }, // future: avg rating
  reviewsCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
