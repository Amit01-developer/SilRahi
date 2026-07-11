import express from "express";
import { customerSchema } from "../validators/customersValidator.js";
import { db, FieldValue } from "../config/firebase.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { distanceKm, isValidCoordinate } from "../utils/geo.js";
import { asyncHandler } from "../utils/httpError.js";

const router = express.Router();



router.get(
  "/me",
  requireAuth,
  requireRole("customer"),
  asyncHandler(async (req, res) => {
    const doc = await db.collection("customers").doc(req.user.uid).get();
    res.json({ customer: { id: doc.id, ...doc.data() } });
  })
);

router.get(
  "/me/dashboard",
  requireAuth,
  requireRole("customer"),
  asyncHandler(async (req, res) => {
    const [customerDoc, bookingSnapshot, tailorSnapshot] = await Promise.all([
      db.collection("customers").doc(req.user.uid).get(),
      db.collection("bookings").where("customerId", "==", req.user.uid).get(),
      db.collection("tailors").where("verified", "==", true).get()
    ]);

    const bookings = bookingSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));

    const stats = {
      totalBookings: bookings.length,
      activeBookings: bookings.filter((booking) => ["pending", "accepted", "in_progress", "ready"].includes(booking.status)).length,
      deliveredBookings: bookings.filter((booking) => booking.status === "delivered").length,
      cancelledBookings: bookings.filter((booking) => booking.status === "cancelled").length
    };

    const customer = customerDoc.exists ? { id: customerDoc.id, ...customerDoc.data() } : null;
    const customerLocation = isValidCoordinate(customer?.location) ? customer.location : null;

    const recommendedTailors = tailorSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((tailor) => tailor.availability !== "offline")
      .map((tailor) => ({
        ...tailor,
        distanceKm:
          customerLocation && isValidCoordinate(tailor.location)
            ? Number(distanceKm(customerLocation, tailor.location).toFixed(2))
            : null
      }))
      .sort((a, b) => {
        if (a.distanceKm !== null && b.distanceKm !== null) return a.distanceKm - b.distanceKm;
        if (a.distanceKm !== null) return -1;
        if (b.distanceKm !== null) return 1;
        return Number(b.rating || 0) - Number(a.rating || 0);
      })
      .slice(0, 4);

    res.json({
      customer,
      bookings,
      recommendedTailors,
      stats
    });
  })
);

router.put(
  "/me",
  requireAuth,
  requireRole("customer"),
  validate(customerSchema),
  asyncHandler(async (req, res) => {
    await db.collection("customers").doc(req.user.uid).set(
      {
        ...req.validated.body,
        updatedAt: FieldValue.serverTimestamp()
      },
      { merge: true }
    );
    const doc = await db.collection("customers").doc(req.user.uid).get();
    res.json({ customer: { id: doc.id, ...doc.data() } });
  })
);

export default router;
