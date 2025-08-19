import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  amount: { type: Number, required: true },
  shippingAddress: {
    line1: String, line2: String, city: String, state: String, zip: String, country: String
  },
  payment: {
    method: { type: String, enum: ["COD", "Razorpay", "Stripe"], default: "COD" },
    status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    providerOrderId: String,
    providerPaymentId: String
  },
  status: { type: String, enum: ["created", "processing", "shipped", "delivered", "cancelled"], default: "created" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
