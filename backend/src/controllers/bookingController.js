import Booking from "../models/Booking.js";

const getCardLast4 = (cardNumber = "") => cardNumber.replace(/\D/g, "").slice(-4);

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("service", "title price")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    next(error);
  }
};

export const getReservedSlots = async (req, res, next) => {
  try {
    const filter = { status: { $nin: ["cancelled", "rejected"] } };

    if (req.query.month) {
      filter.bookingDate = { $regex: `^${req.query.month}` };
    }

    const slots = await Booking.find(filter)
      .select("bookingDate timeSlot status serviceTitle")
      .sort({ bookingDate: 1, timeSlot: 1 });

    res.json({ success: true, count: slots.length, data: slots });
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "service",
      "title price",
    );

    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const {
      service,
      serviceTitle,
      servicePrice,
      name,
      email,
      phone,
      address,
      vehicleNumber,
      vehicleModel,
      notes,
      bookingDate,
      timeSlot,
      paymentMethod,
      cardholderName,
      cardNumber,
    } = req.body;

    const existingBooking = await Booking.findOne({
      bookingDate,
      timeSlot,
      status: { $nin: ["cancelled", "rejected"] },
    });

    if (existingBooking) {
      res.status(409);
      throw new Error("This time slot is already booked");
    }

    const booking = await Booking.create({
      service: service || undefined,
      serviceTitle,
      servicePrice,
      customer: {
        name,
        email,
        phone,
        address,
        vehicleNumber,
        vehicleModel,
        notes,
      },
      bookingDate,
      timeSlot,
      payment: {
        method: paymentMethod,
        amount: servicePrice,
        cardholderName: paymentMethod === "card" ? cardholderName : undefined,
        cardLast4: paymentMethod === "card" ? getCardLast4(cardNumber) : undefined,
        bankSlip:
          paymentMethod === "bank" && req.file
            ? {
                fileName: req.file.originalname,
                mimeType: req.file.mimetype,
                size: req.file.size,
              }
            : undefined,
      },
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409);
      next(new Error("This time slot is already booked"));
      return;
    }

    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true },
    );

    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};