const Car = require('../models/carModel');

exports.createCar = async (req, res) => {
    const { title, description, tags } = req.body;

    try {
        const car = await Car.create({
            user: req.user.id,
            title,
            description,
            tags: tags || [],
            images: [],
        });
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ message: "Error in API: " + error.message });
    }
};

// List all cars of the authenticated user
exports.listCars = async (req, res) => {
    try {
        const cars = await Car.find({ user: req.user.id });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cars', error: error.message });
    }
};

// Get a particular car by ID
exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id, user: req.user.id });

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch car', error: error.message });
    }
};

// Update a car by ID
exports.updateCar = async (req, res) => {
    const { title, description, tags, images } = req.body;

    try {
        const car = await Car.findOne({ _id: req.params.id, user: req.user.id });

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        car.title = title || car.title;
        car.description = description || car.description;
        car.tags = tags || car.tags;
        car.images = images || car.images;

        await car.save();

        res.status(200).json({ message: 'Car updated successfully', car });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update car', error: error.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!car) {
            return res.status(404).json({ message: 'Car not found or not authorized' });
        }

        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete car', error: error.message });
    }
};
