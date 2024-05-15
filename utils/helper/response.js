class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateError";
    this.statusCode = 409;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message || "Unauthorized");
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

class ForbiddenResponse {
  static sendUnauthorized(res) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
}

class UnauthorizedResponse {
  static sendUnauthorized(res) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

function successCreateResponse(res, data) {
  return res.status(201).json({ message: data });
}

function successGetResponse(res, data) {
  return res.status(200).json({ message: data });
}

function serverErrorResponse(res, data) {
  return res.status(500).json({ message: data });
}


module.exports = {
  NotFoundError,
  ValidationError,
  DuplicateError,
  AuthenticationError,
  UnauthorizedError,
  ForbiddenResponse,
  UnauthorizedError,
  UnauthorizedResponse,
  successCreateResponse,
  successGetResponse,
  serverErrorResponse,
};
