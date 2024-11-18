import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from "./entity/Product";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'dbproduct',
  synchronize: true, // true ise schema otomatik olarak senkronize edilir
  logging: true,
  entities: [Product], // Kullanmak istediğiniz Entity'leri ekleyin
  migrations: [],
  subscribers: [],
});
  // Veritabanı bağlantısını başlat
  AppDataSource.initialize()
    .then(() => {
      console.log('Veritabanına başarıyla bağlanıldı ve şema oluşturuldu.');
    })
    .catch((error) => console.log('Veritabanı bağlantı hatası:', error));