"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
router.post('/product', productController_1.createProduct);
router.get('/product', productController_1.getProducts);
router.get('/product/:id', productController_1.getProductById);
router.put('/product/:id', productController_1.updateProduct);
router.delete('/product/:id', productController_1.deleteProduct);
exports.default = router;
