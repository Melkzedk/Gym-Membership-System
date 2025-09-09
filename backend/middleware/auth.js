const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return res.status(401).json({ msg: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains id and role
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token invalid' });
  }
};

exports.admin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ msg: 'Admin only' });
  next();
};
