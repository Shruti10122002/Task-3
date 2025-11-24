// Dummy middleware (can be empty for testing)
const auth = (req, res, next) => {
  next();
};

module.exports = auth;