import { ZodError } from "zod";
import { HttpError } from "../utils/httpError.js";

export function notFound(req, res, next) {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message
    }));
    return res.status(400).json({
      error: "Validation failed",
      details: formattedErrors
    });
  }

  // Handle Firebase errors
  if (err.code && typeof err.code === "string" && err.code.startsWith("auth/")) {
    return res.status(401).json({
      error: "Authentication failed",
      details: err.message
    });
  }

  if (err instanceof HttpError) {
    const payload = { error: err.message };
    if (err.details) {
      payload.details = err.details;
    }
    return res.status(err.status).json(payload);
  }

  const status = err.status || 500;
  const payload = {
    error: status === 500 ? "Internal server error" : err.message
  };

  if (err.details) {
    payload.details = err.details;
  }

  if (process.env.NODE_ENV !== "production" && status === 500) {
    payload.debug = err.message;
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
}
