const { requireAuth: clerkRequireAuth } = require('@clerk/express');

// Middleware to require authentication and extract userId
const requireAuth = [
  clerkRequireAuth(),
  (req, res, next) => {
    // Extract userId from Clerk auth object
    if (req.auth && req.auth.userId) {
      req.userId = req.auth.userId;
      next();
    } else {
      res.status(401).json({ message: 'Authentication required' });
    }
  }
];

module.exports = { requireAuth };
