"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const data_source_1 = require("../data_source");
const Product_1 = require("../models/Product");
// CREATE - Yeni ürün oluştur
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, stock } = req.body;
        const product = new Product_1.Product();
        product.name = name;
        product.description = description;
        product.price = price;
        product.inventory = stock;
        const result = yield data_source_1.AppDataSource.manager.save(product);
        res.status(201).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Ürün oluşturulurken hata oluştu' });
    }
});
exports.createProduct = createProduct;
// READ - Tüm ürünleri getir
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield data_source_1.AppDataSource.manager.find(Product_1.Product);
        res.json({ success: true, data: products });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Ürünler listelenirken hata oluştu' });
    }
});
exports.getProducts = getProducts;
// READ - Tek ürün getir
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const product = yield data_source_1.AppDataSource.manager.findOne(Product_1.Product, { where: { id } });
        if (!product) {
            res.status(404).json({ success: false, error: 'Ürün bulunamadı' });
            return;
        }
        res.json({ success: true, data: product });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Ürün getirilirken hata oluştu' });
    }
});
exports.getProductById = getProductById;
// UPDATE - Ürün güncelle
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, description, price, stock } = req.body;
        const product = yield data_source_1.AppDataSource.manager.findOne(Product_1.Product, { where: { id } });
        if (!product) {
            res.status(404).json({ success: false, error: 'Güncellenecek ürün bulunamadı' });
            return;
        }
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.inventory = stock || product.inventory;
        const result = yield data_source_1.AppDataSource.manager.save(product);
        res.json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Ürün güncellenirken hata oluştu' });
    }
});
exports.updateProduct = updateProduct;
// DELETE - Ürün sil
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const product = yield data_source_1.AppDataSource.manager.findOne(Product_1.Product, { where: { id } });
        if (!product) {
            res.status(404).json({ success: false, error: 'Silinecek ürün bulunamadı' });
            return;
        }
        yield data_source_1.AppDataSource.manager.remove(product);
        res.json({ success: true, message: 'Ürün başarıyla silindi' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Ürün silinirken hata oluştu' });
    }
});
exports.deleteProduct = deleteProduct;
