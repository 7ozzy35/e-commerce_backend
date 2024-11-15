import "reflect-metadata";
import { createConnection } from "typeorm";
import { Urun } from "./entity/urun";

createConnection().then(async connection => {
  console.log("Veritabanına başarıyla bağlanıldı!");

  // Örnek ürün ekleme
  const urun = new Urun();
  urun.ad = "Örnek Ürün";
  urun.fiyat = 50.0;
  urun.stok = 100;

  await connection.manager.save(urun);
  console.log("Yeni ürün kaydedildi:", urun);

  connection.close();
}).catch(error => console.log("Hata:", error));
