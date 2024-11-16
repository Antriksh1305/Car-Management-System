const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const swaggerDocs = require('./api-docs/swagger');

// env config
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI + 'database';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
swaggerDocs(app);

(async () => {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        console.log('Server URL: ' + 'http://localhost:5000/');
        console.log(`API docs available at http://localhost:${PORT}/api/docs`);
    });
})();