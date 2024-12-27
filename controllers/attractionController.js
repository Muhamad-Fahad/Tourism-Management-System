const Attraction = require('../models/Attraction');

exports.createAttraction = async (req, res) => {
    try {
        const attraction = new Attraction(req.body);
        await attraction.save();
        res.status(201).json(attraction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAttractionById = async (req, res) => {
    try {
        const attraction = await Attraction.findById(req.params.id);
        if (!attraction) {
            return res.status(404).json({ message: 'Attraction not found' });
        }
        res.json(attraction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAttraction = async (req, res) => {
    try {
        const attraction = await Attraction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!attraction) {
            return res.status(404).json({ message: 'Attraction not found' });
        }
        res.json(attraction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAttraction = async (req, res) => {
    try {
        const attraction = await Attraction.findByIdAndDelete(req.params.id);
        if (!attraction) {
            return res.status(404).json({ message: 'Attraction not found' });
        }
        res.json({ message: 'Attraction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTopRatedAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find()
            .sort({ rating: -1 })
            .limit(5);
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 