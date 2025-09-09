const mongoose = require('mongoose');

const CheckinSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timeIn: { type: Date, default: Date.now },
  timeOut: Date
});

module.exports = mongoose.model('Checkin', CheckinSchema);
