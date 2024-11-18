import express, { Request, Response } from 'express';
import { AppDataSource } from './data_source';
import { Product } from './entity/Product';
import cors from 'cors';
import path from 'path';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Veritabanı bağlantısı
AppDataSource.initialize()
  .then(() => {
    console.log('Veritabanına başarıyla bağlanıldı.');
  })
  .catch((error) => console.log('Veritabanı bağlantı hatası:', error));

// Ana sayfa
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API Routes
// CREATE - Yeni ürün oluştur
app.post('/api/product', async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock } = req.body;

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.inventory = stock;

    const result = await AppDataSource.manager.save(product);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ürün oluşturulurken hata oluştu'
    });
  }
});

// READ - Tüm ürünleri getir
app.get('/api/product', async (req: Request, res: Response) => {
  try {
    const products = await AppDataSource.manager.find(Product);
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ürünler listelenirken hata oluştu'
    });
  }
});

// READ - Tek ürün getir
app.get('/api/product/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await AppDataSource.manager.findOne(Product, {
      where: { id }
    });

    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Ürün bulunamadı'
      });
      return;
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ürün getirilirken hata oluştu'
    });
  }
});

// UPDATE - Ürün güncelle
app.put('/api/product/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, price, stock } = req.body;

    const product = await AppDataSource.manager.findOne(Product, {
      where: { id }
    });

    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Güncellenecek ürün bulunamadı'
      });
      return;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.inventory = stock || product.inventory;

    const result = await AppDataSource.manager.save(product);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ürün güncellenirken hata oluştu'
    });
  }
});

// DELETE - Ürün sil
app.delete('/api/product/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await AppDataSource.manager.findOne(Product, {
      where: { id }
    });

    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Silinecek ürün bulunamadı'
      });
      return;
    }

    await AppDataSource.manager.remove(product);
    res.json({
      success: true,
      message: 'Ürün başarıyla silindi'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ürün silinirken hata oluştu'
    });
  }
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
  console.log(`http://localhost:${PORT} adresinden erişebilirsiniz`);
});
