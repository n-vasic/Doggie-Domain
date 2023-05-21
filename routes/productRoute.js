import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
  createProductController,
  getProductsController,
} from '../controllers/productController.js';
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

//GET ALL PRODUCTS || GET
router.get('/get-product', getProductsController);

export default router;
