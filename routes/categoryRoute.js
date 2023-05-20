import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
  CreateCategoryController,
  categoryController,
  singleCategoryController,
  updateCategoryController,
} from '../controllers/categoryController.js';

const router = express.Router();

// ROUTES //

//CREATE CATEGORY || POST
router.post(
  '/create-category',
  requireSignIn,
  isAdmin,
  CreateCategoryController
);

//UPDATE CATEGORY || PUT

router.put(
  '/update-category/:id',
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//ALL CATEGORIES || GET

router.get('/get-category', categoryController);

//SINGLE CATEGORIE || GET

router.get('/single-category/:slug', singleCategoryController)

export default router;
