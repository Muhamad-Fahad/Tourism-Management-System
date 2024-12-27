const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    attraction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction',
        required: true
    },
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    }
});

// Ensure a visitor cannot review the same attraction twice
reviewSchema.index({ attraction: 1, visitor: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema); 