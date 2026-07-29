import express from "express";
import { z } from "zod";
import { db, FieldValue } from "../config/firebase.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { distanceKm, isValidCoordinate } from "../utils/geo.js";
import { asyncHandler, HttpError } from "../utils/httpError.js";

const router = express.Router();

const customerSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    phone: z.string().min(10).max(15).optional(),
    address: z.string().optional(),
    location: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180)
    }).optional()
  })
});

const getTimestampMs = (value) => {
  if (!value) return 0;

  if (typeof value.toMillis === "function") {
    return value.toMillis();
  }

  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

router.get(
  "/me",
  requireAuth,
  requireRole("customer"),
  asyncHandler(async (req, res) => {
    const doc = await db.collection("customers").doc(req.user.uid).get();

    if (!doc.exists) {
      throw new HttpError(404, "Customer not found");
    }

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
      db.collection("tailors")
        .where("verified", "==", true)
        .where("availability", "in", ["available", "busy"])
        .get()
    ]);

    const bookings = bookingSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))

      .sort((a, b) => getTimestampMs(b.createdAt) - getTimestampMs(a.createdAt));

      .sort((a, b) =>
        String(b.createdAt || "").localeCompare(String(a.createdAt || ""))
      );


    const stats = {
      totalBookings: bookings.length,
      activeBookings: bookings.filter((booking) =>
        ["pending", "accepted", "in_progress", "ready"].includes(booking.status)
      ).length,

      deliveredBookings: bookings.filter((booking) => booking.status === "delivered").length,
      cancelledBookings: bookings.filter((booking) => booking.status === "cancelled").length

      deliveredBookings: bookings.filter(
        (booking) => booking.status === "delivered"
      ).length,
      cancelledBookings: bookings.filter(
        (booking) => booking.status === "cancelled"
      ).length

    };

    const customer = customerDoc.exists
      ? { id: customerDoc.id, ...customerDoc.data() }
      : null;

    const customerLocation = isValidCoordinate(customer?.location)
      ? customer.location
      : null;

    const recommendedTailors = tailorSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .map((tailor) => ({
        ...tailor,
        distanceKm:
          customerLocation && isValidCoordinate(tailor.location)
            ? Number(
                distanceKm(customerLocation, tailor.location).toFixed(2)
              )
            : null
      }))
      .sort((a, b) => {
        if (a.distanceKm !== null && b.distanceKm !== null) {
          return a.distanceKm - b.distanceKm;
        }

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

    res.json({
      customer: {
        id: doc.id,
        ...doc.data()
      }
    });
  })
);

export default router;