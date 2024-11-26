import { Request, Response } from 'express';
import { AppDataSource } from '../data_source';
import { Product } from '../models/Product';

// CREATE - Yeni ürün oluştur
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, color, size, category } = req.body;
    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.inventory = stock;
    product.color = color;
    product.size = size;
    product.category = category;

    // Ürün veritabanına kaydediliyor
    const result = await AppDataSource.manager.save(product);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ürün oluşturulurken hata oluştu' });
  }
};

// READ - Tüm ürünleri getir
export const getProducts = async (_req: Request, res: Response) => {
  try {
    // Tüm ürünler veritabanından çekiliyor
    const products = await AppDataSource.manager.find(Product);
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ürünler listelenirken hata oluştu' });
  }
};

// READ - Tek ürün getir
export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    // Belirli bir ürün veritabanından çekiliyor
    const product = await AppDataSource.manager.findOne(Product, { where: { id } });

    if (!product) {
      res.status(404).json({ success: false, error: 'Ürün bulunamadı' });
      return;
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ürün getirilirken hata oluştu' });
  }
};

// UPDATE - Ürün güncelle
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, price, stock, color, size, category } = req.body;

    // Güncellenecek ürün veritabanından çekiliyor
    const product = await AppDataSource.manager.findOne(Product, { where: { id } });

    if (!product) {
      res.status(404).json({ success: false, error: 'Güncellenecek ürün bulunamadı' });
      return;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.inventory = stock || product.inventory;
    product.color = color || product.color;
    product.size = size || product.size;
    product.category = category || product.category;

    // Ürün güncelleniyor ve veritabanına kaydediliyor
    const result = await AppDataSource.manager.save(product);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ürün güncellenirken hata oluştu' });
  }
};

// DELETE - Ürün sil
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    // Silinecek ürün veritabanından çekiliyor
    const product = await AppDataSource.manager.findOne(Product, { where: { id } });

    if (!product) {
      res.status(404).json({ success: false, error: 'Silinecek ürün bulunamadı' });
      return;
    }

    // Ürün veritabanından kaldırılıyor
    await AppDataSource.manager.remove(product);
    res.json({ success: true, message: 'Ürün başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ürün silinirken hata oluştu' });
  }
};
