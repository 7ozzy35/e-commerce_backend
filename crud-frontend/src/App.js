import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  // State to hold the form inputs and the product list
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the backend
  const fetchProducts = () => {
    axios.get('/product')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  // Handle form submission for adding a new product
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/product', { name, price, category, description, inventory })
      .then(response => {
        alert('Product successfully added');
        fetchProducts(); // Reload product list after adding a new product
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  // Handle product edit
  const editProduct = (id) => {
    const updatedName = prompt("New product name:");
    const updatedPrice = prompt("New price:");
    const updatedCategory = prompt("New category:");
    const updatedDescription = prompt("New description:");
    const updatedInventory = prompt("New inventory:");

    axios.put(`/product/${id}`, { name: updatedName, price: updatedPrice, category: updatedCategory, description: updatedDescription, inventory: updatedInventory })
      .then(response => {
        alert('Product successfully updated');
        fetchProducts(); // Reload product list after updating
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  // Handle product deletion
  const deleteProduct = (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this product?');
    if (confirmation) {
      axios.delete(`/product/${id}`)
        .then(response => {
          alert('Product successfully deleted');
          fetchProducts(); // Reload product list after deletion
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    }
  };

  return (
    <div>
      <h1>Ürün Yönetimi</h1>

      <h2>Ürün Ekle</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Ürün Adı:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="category">Kategori:</label>
        <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />

        <label htmlFor="description">Açıklama:</label>
        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label htmlFor="price">Fiyat:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label htmlFor="inventory">Stok:</label>
        <input type="number" id="inventory" value={inventory} onChange={(e) => setInventory(e.target.value)} required />

        <button type="submit">Ekle</button>
      </form>

      <h2>Tüm Ürünler</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <p>
              Ad: {product.name}, 
              Fiyat: {product.price}, 
              Stok: {product.inventory}, 
              Açıklama: {product.description}, 
              Kategori: {product.category}
            </p>
            <div className="button-container">
              <button onClick={() => editProduct(product.id)}>Güncelle</button>
              <button onClick={() => deleteProduct(product.id)}>Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
