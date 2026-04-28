require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const productRoutes = require('./routes/product.router');
const categoryRoutes = require('./routes/category.router');

const app = express();

// ==========================================
// CONFIGURAÇÃO DO SWAGGER
// ==========================================
const swaggerDocument = YAML.load(path.resolve(__dirname, './swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ==========================================
// MIDDLEWARES GLOBAIS
// ==========================================
app.use(helmet());
app.use(cors());
app.use(express.json());

// ==========================================
// ROTAS
// ==========================================
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'ecommerce-products' });
});

// ==========================================
// TRATAMENTO DE ERROS GLOBAL
// ==========================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno no servidor!' });
});

module.exports = app;
