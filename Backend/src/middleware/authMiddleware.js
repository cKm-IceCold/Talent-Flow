// Auth middleware placeholders. These functions currently allow all requests through.
// Engineer A should replace these with JWT verification and role checking.

const protect = (req, res, next) => {
  // TODO: Extract token from Authorization header and verify it.
  // Attach user information to req.user after validation.
  next();
};

const mentorOrAdmin = (req, res, next) => {
  // TODO: Use req.user.role to verify the caller is either a mentor or admin.
  // Reject with 403 Forbidden if the role is not permitted.
  next();
};

const admin = (req, res, next) => {
  // TODO: Allow only admin users to proceed.
  next();
};

module.exports = { protect, mentorOrAdmin, admin };