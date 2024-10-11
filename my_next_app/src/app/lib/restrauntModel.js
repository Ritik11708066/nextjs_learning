// creating and setting up schema for database.

const mongoose = require("mongoose");

const RestrauntSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  restrauntName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  contact: { type: String, required: true },
});

export default mongoose.models.restraunts ||
  mongoose.model("restraunts", RestrauntSchema);
