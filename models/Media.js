const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Movie', 'TV Show'], required: true },
  status: { type: String, enum: ['Watched', 'Plan to Watch'], default: 'Plan to Watch' },
  rating: { type: Number, min: 0, max: 10 },
  review: { type: String },
  releaseDate: { type: Date },
});

const Media = mongoose.model('Media', mediaSchema);
module.exports = Media;
