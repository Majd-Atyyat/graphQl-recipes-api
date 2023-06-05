const jwt = require('jsonwebtoken');

module.exports = (context) => {
  // Get the authorization header from the request
  const authHeader = context.req.headers.authorization;

  // Check if the authorization header exists and contains a token
  if (authHeader) {
    // Extract the token from the header
    const token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        // Verify the token
        const user = jwt.verify(token, 'your-secret-key');

        // Attach the authenticated user to the request context
        return user;
      } catch (err) {
        throw new Error('Invalid/Expired token');
      }
    }

    throw new Error("Authentication token must be 'Bearer [token]'");
  }

  throw new Error('Authorization header must be provided');
};
