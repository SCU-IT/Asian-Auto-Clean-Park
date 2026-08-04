import express from "express";
import {
  createContactMessage,
  getContactMessages,
  updateContactMessageStatus,
} from "../controllers/contactController.js";

const router = express.Router();

router.route("/").get(getContactMessages).post(createContactMessage);
router.patch("/:id/status", updateContactMessageStatus);

export default router;
