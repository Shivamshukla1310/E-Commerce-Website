import mongoose from "mongoose";

export async function connectDB(uri) {
  try {
    await mongoose.connect(uri, { dbName: "mern_shop" });
    console.log("✅ MongoDB connected");
  } catch (e) {
    console.error("Mongo error:", e.message);
    process.exit(1);
  }
}
