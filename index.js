const express = require('express');
const router = require('./routes/router');
const authCheck = require('./middleware/auth');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// ✅ 1. Middleware to parse body — should come BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ 2. CORS
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ 3. Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ✅ 4. Routes
app.use('/api', router);

// ✅ 5. Auth Middleware (if needed globally after routes)
app.use(authCheck);

// ✅ 6. Start server
app.listen(5000, () => {
  console.log('server started at port 5000');
});
