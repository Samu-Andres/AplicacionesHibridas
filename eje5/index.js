const express = require('express');
const ProductManager = require('./productmanager');
const app = express();
const PORT = 3000;

const manager = new ProductManager('./products.json');


app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Servidor Express funcionando 🟢' });
});


app.get('/api/products', (req, res) => {
  const products = manager.getProducts();
  res.json(products);
});


app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = manager.getProductById(id);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
});


app.post('/api/products', (req, res) => {
  const newProduct = req.body;

  const { id, title, description, price } = newProduct;
  if (!id || !title || !description || !price) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const exists = manager.getProductById(id);
  if (exists) {
    return res.status(400).json({ error: 'Ya existe un producto con ese ID' });
  }

  manager.addProduct(newProduct);
  res.status(201).json({ message: 'Producto agregado correctamente', product: newProduct });
});


app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});