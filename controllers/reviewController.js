const Review = require('../models/Review');
const Attraction = require('../models/Attraction');
const Visitor = require('../models/Visitor');

exports.createReview = async (req, res) => {
    try {
        const { attraction, visitor } = req.body;

        // Check if the visitor has visited the attraction
        const visitorDoc = await Visitor.findById(visitor);
        if (!visitorDoc || !visitorDoc.visitedAttractions.includes(attraction)) {
            return res.status(400).json({ message: 'Visitor has not visited this attraction' });
        }

        // Check if the visitor has already reviewed this attraction
        const existingReview = await Review.findOne({ attraction, visitor });
        if (existingReview) {
            return res.status(400).json({ message: 'Visitor has already reviewed this attraction' });
        }

        // Create and save the new review
        const review = new Review(req.body);
        await review.save();

        // Update attraction's average rating
        const reviews = await Review.find({ attraction: review.attraction });
        const avgRating = reviews.reduce((acc, curr) => acc + curr.score, 0) / reviews.length;

        await Attraction.findByIdAndUpdate(
            review.attraction,
            { averageRating: avgRating.toFixed(1) }
        );

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('visitor', 'name')
            .populate('attraction', 'name');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('visitor', 'name')
            .populate('attraction', 'name');
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReviewsByAttraction = async (req, res) => {
    try {
        const reviews = await Review.find({ attraction: req.params.attractionId })
            .populate('visitor', 'name')
            .populate('attraction', 'name');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAttractionPartial = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; // Get the updates from the request body

        // Update the attraction with the provided fields
        const updatedAttraction = await Attraction.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedAttraction) {
            return res.status(404).json({ message: 'Attraction not found' });
        }

        res.json(updatedAttraction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 