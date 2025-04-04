import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class ProductManager {
  constructor(fileName) {
    this.filePath = path.join(__dirname, '..', 'data', fileName);
    this.products = this.loadProducts();
  }

  loadProducts() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  saveProducts() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  addProduct(product) {
    const { id, title, description, price } = product;
    if (!id || !title || !description || !price) return false;
    if (this.products.some(p => p.id === id)) return false;

    this.products.push(product);
    this.saveProducts();
    return product;
  }

  updateProduct(id, updatedData) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.products[index] = { ...this.products[index], ...updatedData };
    this.saveProducts();
    return this.products[index];
  }

  deleteProductById(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1);
    this.saveProducts();
    return true;
  }
}