"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const data_source_1 = require("./data_source");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
// Veritabanı bağlantısı
data_source_1.AppDataSource.initialize()
    .then(() => console.log('Veritabanına başarıyla bağlanıldı.'))
    .catch((error) => console.log('Veritabanı bağlantı hatası:', error));
// Ana sayfa
app.get('/', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
// API Routes
app.use('/api', productRoutes_1.default);
// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
    console.log(`http://localhost:${PORT} adresinden erişebilirsiniz`);
});
