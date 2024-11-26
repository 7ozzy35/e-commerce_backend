# E-commerce Projesi

Bu proje, Node.js, TypeScript, TypeORM ve PostgreSQL kullanılarak geliştirilmiş bir e-ticaret uygulaması için temel bir yapı sunmaktadır.

## Gereksinimler

- Node.js (v18 veya üstü)
- NPM veya Yarn
- PostgreSQL
- TypeORM

## Projeyi Klonlama

Projeyi GitHub'dan klonlamak için aşağıdaki komutu kullanabilirsiniz:

```bash
git clone https://github.com/7ozzy35/Task1_e-commerce.git
```

## Gerekli Bağımlılıkları Yükleyin

Projedeki bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```bash
npm install
```

## PostgreSQL Kurulumu ve Yapılandırması

Projede PostgreSQL veritabanı kullanıldığı için, PostgreSQL'in bilgisayarınızda kurulu olması gerekmektedir. Eğer PostgreSQL'i henüz kurmadıysanız, PostgreSQL İndirme Sayfası üzerinden uygun sürümü indirip kurabilirsiniz.

### 1. PostgreSQL Kurulumu

PostgreSQL'inizi kurduktan sonra, terminal veya komut satırında PostgreSQL shell'ine (psql) giriş yapmak için aşağıdaki komutu kullanabilirsiniz:

```bash
psql -U postgres
```

### 2. Yeni Bir Veritabanı Oluşturma

PostgreSQL shell'ine girdikten sonra yeni bir veritabanı oluşturmak için aşağıdaki SQL komutunu kullanın:

```sql
CREATE DATABASE dbproduct;
```

### 3. data_source.ts Dosyasının Yapılandırılması

Projede TypeORM ile PostgreSQL'e bağlanmak için data_source.ts dosyasındaki veritabanı bağlantı bilgilerini düzenlemeniz gerekecek.

Aşağıdaki adımları izleyerek bağlantı bilgilerini doğru şekilde girin:

- username: PostgreSQL kullanıcınız (varsayılan olarak postgres).
- password: PostgreSQL şifreniz (kurulum sırasında belirlediğiniz şifre).
- database: Oluşturduğunuz veritabanı adı (burada dbproduct kullanıldı, ancak sizin seçtiğiniz başka bir isim olabilir).

### 4. Bağımlılıkları Yükleyin

Bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```bash
npm install
```

### 5. Uygulamayı Başlatma

Veritabanı bağlantınızın doğru yapılandırıldığından emin olduktan sonra, uygulamanızı başlatabilirsiniz. Aşağıdaki komutu kullanarak uygulamanızı başlatın:

```bash
ts-node src/index.ts
```

## Proje Kullanımı

Projeyi başlattıktan sonra, aşağıdaki özellikleri kullanabilirsiniz:

- Ürün Listeleme: E-ticaret uygulamanızda ürünleri listelemek ve yönetmek için gerekli API'ler bulunmaktadır.
- Ürün Ekleme/Düzenleme/Silme: Yönetici paneli üzerinden ürün ekleyebilir, düzenleyebilir ve silebilirsiniz.
- Lisans: Bu proje MIT lisansı ile lisanslanmıştır.

