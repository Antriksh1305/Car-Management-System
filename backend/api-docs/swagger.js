const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Car Management API', version: '1.0.0' },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        servers: [
            { url: 'https://car-management-backend-rust.vercel.app', description: 'Staging server', },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = (app) => {
    app.use(
        '/api/docs',
        swaggerUi.serve,
        swaggerUi.setup(specs, {
            explorer: true,
            swaggerOptions: {
                persistAuthorization: true, // Keep bearer token across sessions
            },
        })
    );
};
