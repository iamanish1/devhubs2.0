export const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal error";
  return res.status(statusCode).json({
    success: err.success || false,
    message: message,
    stack: process.env.NODE_ENV === "production" ? err.stack : undefined,
  });
};
