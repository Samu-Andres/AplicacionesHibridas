const ProductManager = require('./productmanager');

const manager = new ProductManager('products.json');

// Probar agregar producto
manager.addProduct({ id: 1, title: "Mouse", description: "Mouse gamer", price: 3000 });
manager.addProduct({ id: 2, title: "Teclado", description: "Teclado mecánico", price: 7000 });

// Obtener todos los productos (leer desde JSON)
console.log("Productos actuales:", manager.getProducts());

// Buscar por ID
console.log("Buscar ID 2:", manager.getProductById(2));
console.log("Buscar ID 99:", manager.getProductById(99));