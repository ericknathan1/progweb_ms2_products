const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const ProductRepository = require('../repositories/product.repository');
const ProductService = require('../services/product.service');
const ProductController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const prisma = new PrismaClient();
const repository = new ProductRepository(prisma);
const service = new ProductService(repository);
const controller = new ProductController(service);

router.use(authMiddleware);

router.get('/', controller.getAll);
router.get('/search/name', controller.getByName);
router.get('/category/:id', controller.getByCategory);
router.get('/price/:price', controller.getByPrice);
router.get('/size/:size', controller.getBySize);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
