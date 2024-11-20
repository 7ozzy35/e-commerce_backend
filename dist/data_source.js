"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Product_1 = require("./models/Product");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'dbproduct',
    synchronize: true, // true ise schema otomatik olarak senkronize edilir
    logging: true,
    entities: [Product_1.Product], // Kullanmak istediğiniz Entity'leri ekleyin
    migrations: [],
    subscribers: [],
});
// Veritabanı bağlantısını başlat
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Veritabanına başarıyla bağlanıldı ve şema oluşturuldu.');
})
    .catch((error) => console.log('Veritabanı bağlantı hatası:', error));
