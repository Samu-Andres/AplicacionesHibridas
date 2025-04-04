import express from 'express';
import ProductManager from './managers/productManager.js';

const app = express();
const PORT = 3000;


app.use(express.json());


const manager = new ProductManager('products.json');


app.get('/', (req, res) => {
  res.send('Bienvenido a la API de productos 🚀');
});


app.get('/api/products', (req, res) => {
  const products = manager.getProducts();
  res.status(200).json(products);
});

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = manager.getProductById(id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});


app.post('/api/products', (req, res) => {
  try {
    const product = req.body;
    const result = manager.addProduct(product);

    if (!result) {
      return res.status(400).json({ error: 'Datos inválidos o ID duplicado' });
    }

    res.status(201).json(result);
  } catch (error) {
    console.error('Error al agregar producto:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;

  const updated = manager.updateProductById(id, newData);

  if (updated) {
    res.status(200).json({ message: 'Producto actualizado', product: updated });
  } else {
    res.status(404).json({ error: 'Producto no encontrado o datos inválidos' });
  }
});


app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = manager.deleteProductById(id);

  if (deleted) {
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});