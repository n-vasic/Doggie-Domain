import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
  CreateCategoryController,
  updateCategoryController,
} from '../controllers/categoryController.js';

const router = express.Router();

//routes

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

export default router;
