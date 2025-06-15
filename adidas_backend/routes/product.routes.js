import express from 'express';
import {
  CreateNewProduct,
  GetMenProducts,
  GetWomenProducts,
  GetKidsProducts,
  GetHomeProducts,
  GetSingleProducts
} from '../controllers/product.controller.js';

const router = express.Router();

// Existing route
router.post('/create-new-product', CreateNewProduct);

// New category-specific routes
router.get('/men', GetMenProducts);
router.get('/women', GetWomenProducts);
router.get('/kids', GetKidsProducts);
router.get('/home', GetHomeProducts);
router.post("/get-single-product/:id", GetSingleProducts);

export default router;
