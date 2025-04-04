class ProductManager {
  constructor() {
    this.products = [];
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
    console.log("Producto agregado correctamente");
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