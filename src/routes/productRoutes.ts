import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const router = express.Router();

/**
 * Base Route: /products
 * Description: Handles CRUD operations for products.
 */

// CREATE - Add a new product
router.post('/', createProduct); // POST /products

// READ - Get all products
router.get('/', getProducts); // GET /products

// READ - Get a single product by ID
router.get('/:id', getProductById); // GET /products/:id

// UPDATE - Update an existing product
router.put('/:id', updateProduct); // PUT /products/:id

// DELETE - Remove a product by ID
router.delete('/:id', deleteProduct); // DELETE /products/:id

export default router;
