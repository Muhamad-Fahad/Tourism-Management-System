const Visitor = require('../models/Visitor');

exports.createVisitor = async (req, res) => {
    try {
        const visitor = new Visitor(req.body);
        await visitor.save();
        res.status(201).json(visitor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.json(visitors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.json(visitor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.json(visitor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.json({ message: 'Visitor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVisitorActivity = async (req, res) => {
    try {
        const visitors = await Visitor.aggregate([
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'visitor',
                    as: 'reviews'
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    reviewCount: { $size: '$reviews' }
                }
            }
        ]);
        res.json(visitors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 