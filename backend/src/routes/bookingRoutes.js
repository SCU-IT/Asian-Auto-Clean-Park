import express from "express";
import {
  createBooking,
  getBookingById,
  getBookings,
  getReservedSlots,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { uploadReceipt } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.route("/").get(getBookings).post(uploadReceipt.single("bankSlip"), createBooking);
router.get("/reserved-slots", getReservedSlots);
router.get("/:id", getBookingById);
router.patch("/:id/status", updateBookingStatus);

export default router;