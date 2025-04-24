function roleMiddleware(requireRole) {
  return (req, res, next) => {
    if (!req.session.isAuth) {
      return res.json({ error: "Unauthorized" });
    }
    if (req.session.user.role !== requireRole) {
      return res.json({ error: "Unauthorized user" });
    }
    return next();
  };
}

module.exports = roleMiddleware;
