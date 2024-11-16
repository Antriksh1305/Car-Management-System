const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createCar,
  listCars,
  getCarById,
  updateCar,
  deleteCar,
} = require('../controllers/carController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - tags
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the car
 *         title:
 *           type: string
 *           description: The title of the car
 *         description:
 *           type: string
 *           description: The description of the car
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the car (e.g., type, company, dealer)
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of URLs pointing to the car images
 *         user:
 *           type: string
 *           description: The id of the user who created the car
 *       example:
 *         title: Tesla Model S
 *         description: A premium electric car
 *         tags: ["electric", "luxury", "tesla"]
 *         images: ["https://cloudinary.com/car1.jpg"]
 *         user: 12345
 */

/**
 * @swagger
 * /api/cars/create:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the car
 *               description:
 *                 type: string
 *                 description: Description of the car
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags associated with the car (comma-separated values)
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: URLs of car images
 *     responses:
 *       201:
 *         description: Car created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Invalid request
 */
router.post('/create', protect, createCar);

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get a list of all cars created by the logged-in user
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Server error
 */
router.get('/', protect, listCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get details of a specific car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 *     responses:
 *       200:
 *         description: Car details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 */
router.get('/:id', protect, getCarById);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the car
 *               description:
 *                 type: string
 *                 description: Description of the car
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags associated with the car
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URLs of car images
 *     responses:
 *       200:
 *         description: Car updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 */
router.put('/:id', protect, updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 */
router.delete('/:id', protect, deleteCar);

module.exports = router;
