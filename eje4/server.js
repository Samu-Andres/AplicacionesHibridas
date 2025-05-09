const http = require('http');
const url = require('url');
const ProductManager = require('../eje3/productmanager');

const PORT = 3000;


const manager = new ProductManager('../eje3/products.json');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  
  res.setHeader('Content-Type', 'application/json');

  
  if (method === 'GET' && path === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: '¡Bienvenido al servidor de productos!' }));
  }

  
  else if (method === 'GET' && path === '/products') {
    const products = manager.getProducts();
    res.writeHead(200);
    res.end(JSON.stringify(products));
  }

  
  else if (method === 'GET' && path.startsWith('/products/')) {
    const idStr = path.split('/')[2];
    const id = parseInt(idStr);

    if (isNaN(id)) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'ID inválido' }));
      return;
    }

    const product = manager.getProductById(id);
    if (product) {
      res.writeHead(200);
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Producto no encontrado' }));
    }
  }

  
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});