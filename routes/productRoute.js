import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
  createProductController,
  deleteProductController,
  getProductsController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
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

//GET SINGLE PRODUCT || GET
router.get('/get-product/:slug', getSingleProductController);

//GET PHOTO || GET
router.get('/product-photo/:pid', productPhotoController);

//DELETE PRODUCT || DELETE
router.delete('/delete-product/:pid', deleteProductController)

//UPDATE PRODUCT || PUT
router.put(
    '/update-product/:pid',
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );
export default router;
