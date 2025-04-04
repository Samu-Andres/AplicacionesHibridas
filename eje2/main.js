const ProductManager = require('./index');

// Creamos instancia
const manager = new ProductManager();

// Agregamos productos válidos
manager.addProduct({ id: 1, title: "Mouse", description: "Mouse gamer", price: 3000 });
manager.addProduct({ id: 2, title: "Teclado", description: "Teclado mecánico", price: 7000 });

// Intentamos agregar uno con ID repetido
manager.addProduct({ id: 1, title: "Monitor", description: "Monitor 24 pulgadas", price: 15000 });

// Intentamos agregar uno con campos faltantes
manager.addProduct({ id: 3, title: "Auriculares", price: 4000 }); // falta descripción

// Mostramos todos los productos
console.log("Todos los productos:", manager.getProducts());

// Buscar producto por ID
console.log("Producto con ID 2:", manager.getProductById(2));

// Buscar uno que no existe
console.log("Producto con ID 99:", manager.getProductById(99));