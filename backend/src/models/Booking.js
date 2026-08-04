import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    serviceTitle: {
      type: String,
      required: true,
      trim: true,
    },
    servicePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    customer: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
      phone: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      vehicleNumber: { type: String, trim: true },
      vehicleModel: { type: String, trim: true },
      notes: { type: String, trim: true },
    },
    bookingDate: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    timeSlot: {
      type: String,
      required: true,
      trim: true,
    },
    payment: {
      method: {
        type: String,
        enum: ["card", "bank"],
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      cardholderName: {
        type: String,
        trim: true,
      },
      cardLast4: {
        type: String,
        trim: true,
        maxlength: 4,
      },
      bankSlip: {
        fileName: String,
        mimeType: String,
        size: Number,
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "completed", "cancelled", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

bookingSchema.index({ bookingDate: 1, timeSlot: 1 }, { unique: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;