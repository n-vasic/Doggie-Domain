import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

//ROUTES

// CREATE PRODUCT || POST
router.post(
  '/create-product',
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

export default router;
