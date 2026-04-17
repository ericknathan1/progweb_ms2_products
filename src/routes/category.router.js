const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const CategoryRepository = require('../repositories/category.repository');
const CategoryService = require('../services/category.service');
const CategoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const prisma = new PrismaClient();
const repository = new CategoryRepository(prisma);
const service = new CategoryService(repository);
const controller = new CategoryController(service);

router.use(authMiddleware);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
