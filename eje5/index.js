const express = require('express');
const ProductManager = require('./productmanager');
const app = express();
const PORT = 3000;

const manager = new ProductManager('./products.json');

// Middleware para poder leer JSON en requests POST
app.use(express.json());

// Ruta raíz para saber que el server funciona (opcional)
app.get('/', (req, res) => {
  res.json({ message: 'Servidor Express funcionando 🟢' });
});

// GET /api/products - obtener todos los productos
app.get('/api/products', (req, res) => {
  const products = manager.getProducts();
  res.json(products);
});

// GET /api/products/:id - obtener producto por ID
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = manager.getProductById(id);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
});

// POST /api/products - agregar un nuevo producto
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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});