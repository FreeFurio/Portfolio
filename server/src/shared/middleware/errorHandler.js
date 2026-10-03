export class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not found') { super(404, message); }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') { super(403, message); }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed') { super(400, message); }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict') { super(409, message); }
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  const message = err.status ? err.message : 'Internal server error';

  if (!err.status) {
    console.error(`[Error] ${req.method} ${req.path}:`, err);
  }

  res.status(status).json({ success: false, message, data: null, errors: [] });
}
