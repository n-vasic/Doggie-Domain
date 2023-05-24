import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
  createProductController,
  deleteProductController,
  getProductsController,
  getSingleProductController,
  productFiltersController,
  productPhotoController,
  updateProductController,
  productCountController,
  productListController,
  searchProductController,
  
} from '../controllers/productController.js';
import formidable from 'express-formidable';
import { get } from 'mongoose';

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
router.delete('/delete-product/:pid', deleteProductController);

//UPDATE PRODUCT || PUT
router.put(
  '/update-product/:pid',
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//FILTER PRODUCTS || POST
router.post('/product-filters', productFiltersController)

//PRODUCT COUNT || GET
router.get('/product-count', productCountController)

//PRODUCTS PER PAGE || GET
router.get('/product-list/:page',productListController)

//SEARCH PRODUCTS || GET
router.get('/search/:keyword',searchProductController)

export default router;
