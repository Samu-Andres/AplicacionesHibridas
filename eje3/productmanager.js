const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor(fileName) {
    this.path = path.resolve(__dirname, fileName);
    this.products = [];

    this.loadProductsFromFile(); // Al crear la instancia, cargamos los productos
  }

  loadProductsFromFile() {
    try {
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, 'utf-8');
        this.products = JSON.parse(data);
      } else {
        this.products = [];
      }
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      this.products = [];
    }
  }

  saveProductsToFile() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error('Error al escribir en el archivo:', error);
    }
  }

  addProduct(product) {
    const { id, title, description, price } = product;

    if (!id || !title || !description || !price) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    const exists = this.products.some(p => p.id === id);
    if (exists) {
      console.error("Ya existe un producto con ese ID");
      return;
    }

    this.products.push(product);
    this.saveProductsToFile();
    console.log("Producto agregado y guardado correctamente");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      console.error("Not found");
      return;
    }
    return product;
  }
}

module.exports = ProductManager;